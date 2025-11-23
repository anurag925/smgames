// src/lib/websocket-server.ts
import { WebSocket, WebSocketServer } from 'ws';
import RoomManager, { GameRoom } from './room-manager';

class GameServer {
  private wss: WebSocketServer;
  private roomManager: RoomManager;

  constructor(server: any) {
    this.roomManager = new RoomManager();
    this.wss = new WebSocketServer({ server });
    this.setupWebSocketHandlers();
  }

  private setupWebSocketHandlers() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('New client connected');

      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          this.handleMessage(ws, data);
        } catch (error) {
          console.error('Error parsing message:', error);
          this.sendError(ws, 'Invalid message format');
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
        this.handleDisconnect(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
  }

  private sendMessage(ws: WebSocket, message: any) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  private sendError(ws: WebSocket, message: string) {
    this.sendMessage(ws, { type: 'error', message });
  }

  private broadcastToRoom(room: GameRoom, message: any, excludeSender?: WebSocket) {
    room.players.forEach(player => {
      if (player && player.ws !== excludeSender && player.connected) {
        this.sendMessage(player.ws, message);
      }
    });
  }

  private handleMessage(ws: WebSocket, data: any) {
    const { type, ...payload } = data;

    switch (type) {
      case 'create_room':
        this.handleCreateRoom(ws);
        break;
      case 'join_room':
        this.handleJoinRoom(ws, payload.roomId);
        break;
      case 'make_guess':
        this.handleMakeGuess(ws, payload.guess);
        break;
      case 'start_game':
        this.handleStartGame(ws);
        break;
      case 'reset_game':
        this.handleResetGame(ws);
        break;
      case 'leave_room':
        this.handleLeaveRoom(ws);
        break;
      default:
        this.sendError(ws, 'Unknown message type');
    }
  }

  private handleCreateRoom(ws: WebSocket) {
    // First check if this WebSocket is already in a room
    const existingRoom = this.roomManager.getRoomForPlayer(ws);
    if (existingRoom) {
      this.sendError(ws, 'You are already in a room. Please leave the current room first.');
      return;
    }

    const room = this.roomManager.createRoom(ws);

    // Send room creation confirmation to the host
    this.sendMessage(ws, {
      type: 'room_created',
      roomId: room.id,
      secretNumber: room.hostSecret, // Host gets their own secret number
      role: 'host',
      status: 'waiting' // Explicitly set initial status
    });

    console.log(`Room ${room.id} created by host`);
  }

  private handleJoinRoom(ws: WebSocket, roomId: string) {
    const room = this.roomManager.addPlayerToRoom(roomId, ws);

    if (!room) {
      this.sendError(ws, roomId ? 'Room not found' : 'Room is full');
      return;
    }

    // Notify both players of the updated game state
    const gameState = {
      type: 'game_state',
      status: room.status,
      players: [
        {
          id: room.players[0]?.id,
          role: room.players[0]?.role,
          connected: room.players[0]?.connected
        },
        {
          id: room.players[1]?.id,
          role: room.players[1]?.role,
          connected: room.players[1]?.connected
        }
      ],
      yourSecret: room.players[1]?.role === 'guest' ? room.guestSecret : room.hostSecret,
      guessHistory: room.guessHistory,
      currentTurn: room.currentTurn,
      opponentConnected: room.players[0]?.connected
    };

    // Send to guest
    this.sendMessage(ws, {
      ...gameState,
      role: 'guest'
    });

    // Send to host
    if (room.players[0]?.ws) {
      this.sendMessage(room.players[0].ws, {
        ...gameState,
        role: 'host'
      });
    }

    console.log(`Guest joined room ${roomId}`);
  }

  private handleMakeGuess(ws: WebSocket, guess: string) {
    const room = this.roomManager.getRoomForPlayer(ws);
    if (!room) {
      console.log('Player attempted to make a guess but is not in a room');
      this.sendError(ws, 'Not in a room. Please join or create a room first.');
      return;
    }

    if (room.status !== 'playing') {
      console.log(`Player in room ${room.id} attempted to guess while game status is ${room.status}`);
      this.sendError(ws, `Game is not active. Current status: ${room.status}`);
      return;
    }

    const playerRole = this.roomManager.getRoleForPlayer(ws, room);
    if (!playerRole) {
      console.log('Could not determine player role in room');
      this.sendError(ws, 'Role not determined. Please rejoin the room.');
      return;
    }

    if (playerRole !== room.currentTurn) {
      console.log(`Player attempted to guess out of turn. Current turn: ${room.currentTurn}, Player role: ${playerRole}`);
      this.sendError(ws, `Not your turn. Current turn: ${room.currentTurn}`);
      return;
    }

    if (!this.roomManager.validateGuess(guess)) {
      console.log(`Invalid guess format: ${guess}`);
      this.sendError(ws, 'Invalid guess format. Please enter a 4-digit number with unique digits (1-9).');
      return;
    }

    // Get the opponent's secret number based on the guessing player
    const opponentSecret = playerRole === 'host' ? room.guestSecret : room.hostSecret;
    if (!opponentSecret) {
      console.log(`Opponent secret not available for player ${playerRole} in room ${room.id}`);
      this.sendError(ws, 'Opponent secret not available. Please restart the game.');
      return;
    }

    // Calculate feedback
    const feedback = this.roomManager.calculateFeedback(guess, opponentSecret);
    const isCorrect = feedback.correctPosition === 4;

    // Add to guess history
    room.guessHistory.push({
      guesser: playerRole,
      guess,
      correctPosition: feedback.correctPosition,
      correctNumber: feedback.correctNumber,
      timestamp: Date.now()
    });

    // Check for winner
    if (isCorrect) {
      room.winner = playerRole;
      room.status = 'ended';
      console.log(`Player ${playerRole} in room ${room.id} won the game!`);
    } else {
      // Switch turn
      room.currentTurn = playerRole === 'host' ? 'guest' : 'host';
    }

    // Prepare game state update
    const gameState = {
      type: 'game_update',
      status: room.status,
      guessHistory: [...room.guessHistory],
      winner: room.winner,
      currentTurn: room.currentTurn,
      guessResult: {
        guess,
        correctPosition: feedback.correctPosition,
        correctNumber: feedback.correctNumber
      }
    };

    // Broadcast to both players
    this.broadcastToRoom(room, gameState);
    this.sendMessage(ws, gameState); // Also send to the guesser
  }

  private handleStartGame(ws: WebSocket) {
    // This might be used if we implement a ready-based start
    // For now, game starts automatically when guest joins
    const room = this.roomManager.getRoomForPlayer(ws);
    if (!room) {
      this.sendError(ws, 'Not in a room');
      return;
    }

    if (room.status === 'waiting' && room.players[0]?.ws === ws) {
      // Host can start the game if guest is connected
      room.status = 'playing';

      const gameState = {
        type: 'game_started',
        status: 'playing',
        currentTurn: room.currentTurn
      };

      this.broadcastToRoom(room, gameState);
    }
  }

  private handleResetGame(ws: WebSocket) {
    const room = this.roomManager.getRoomForPlayer(ws);
    if (!room) {
      this.sendError(ws, 'Not in a room');
      return;
    }

    // Reset the game state
    this.roomManager.resetRoom(room);

    const gameState = {
      type: 'game_reset',
      status: 'playing',
      guessHistory: [],
      winner: null,
      currentTurn: 'host'
    };

    this.broadcastToRoom(room, gameState);
  }

  private handleDisconnect(ws: WebSocket) {
    const room = this.roomManager.getRoomForPlayer(ws);
    this.roomManager.removePlayer(ws);

    if (room) {
      // Notify the other player about the disconnection
      if (room.players[0]?.ws && room.players[0].ws !== ws) {
        this.sendMessage(room.players[0].ws, {
          type: 'opponent_disconnected',
          disconnected: true
        });
      } else if (room.players[1]?.ws && room.players[1].ws !== ws) {
        this.sendMessage(room.players[1].ws, {
          type: 'opponent_disconnected',
          disconnected: true
        });
      }
    }
  }

  private handleLeaveRoom(ws: WebSocket) {
    this.handleDisconnect(ws);
  }

  public getWss(): WebSocketServer {
    return this.wss;
  }
}

export default GameServer;