// src/lib/room-manager.ts
import { WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

// Define game types
type GameStatus = 'waiting' | 'playing' | 'ended';
type PlayerRole = 'host' | 'guest';

interface Player {
  id: string;
  ws: WebSocket;
  role: PlayerRole;
  connected: boolean;
}

export interface GameRoom {
  id: string;
  players: [Player | null, Player | null]; // [host, guest]
  status: GameStatus;
  hostSecret: string | null;
  guestSecret: string | null;
  guessHistory: {
    guesser: PlayerRole;
    guess: string;
    correctPosition: number;
    correctNumber: number;
    timestamp: number;
  }[];
  winner: PlayerRole | null;
  currentTurn: PlayerRole;
  createdAt: number;
}

class RoomManager {
  private rooms: Map<string, GameRoom> = new Map();

  public createRoom(hostWs: WebSocket): GameRoom {
    const roomId = uuidv4().substring(0, 6).toUpperCase();
    const secretNumber = this.generateSecretNumber();
    
    const room: GameRoom = {
      id: roomId,
      players: [
        {
          id: uuidv4(),
          ws: hostWs,
          role: 'host',
          connected: true
        },
        null
      ],
      status: 'waiting', // Waiting for guest to join
      hostSecret: secretNumber,
      guestSecret: null,
      guessHistory: [],
      winner: null,
      currentTurn: 'host', // When game starts, host goes first
      createdAt: Date.now()
    };

    this.rooms.set(roomId, room);
    return room;
  }

  public getRoom(roomId: string): GameRoom | undefined {
    return this.rooms.get(roomId);
  }

  public addPlayerToRoom(roomId: string, guestWs: WebSocket): GameRoom | null {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      return null;
    }
    
    if (room.players[1] !== null) {
      return null; // Room is full
    }
    
    // Add the guest to the room
    room.players[1] = {
      id: uuidv4(),
      ws: guestWs,
      role: 'guest',
      connected: true
    };

    // Generate secret number for the guest
    room.guestSecret = this.generateSecretNumber();

    // Update room status to playing
    room.status = 'playing';

    return room;
  }

  public removePlayer(ws: WebSocket): void {
    for (const [roomId, room] of this.rooms.entries()) {
      if (room.players[0]?.ws === ws) {
        room.players[0].connected = false;
      } else if (room.players[1]?.ws === ws) {
        room.players[1].connected = false;
      }

      // If both players are disconnected, remove the room
      if (!room.players[0]?.connected && !room.players[1]?.connected) {
        this.rooms.delete(roomId);
        console.log(`Room ${roomId} removed`);
      }
    }
  }

  public isPlayerInRoom(ws: WebSocket): boolean {
    for (const room of this.rooms.values()) {
      if (room.players[0]?.ws === ws || room.players[1]?.ws === ws) {
        return true;
      }
    }
    return false;
  }

  public getRoomForPlayer(ws: WebSocket): GameRoom | null {
    for (const room of this.rooms.values()) {
      if (room.players[0]?.ws === ws || room.players[1]?.ws === ws) {
        return room;
      }
    }
    return null;
  }

  public getRoleForPlayer(ws: WebSocket, room: GameRoom): PlayerRole | null {
    if (room.players[0]?.ws === ws) return 'host';
    if (room.players[1]?.ws === ws) return 'guest';
    return null;
  }

  public resetRoom(room: GameRoom): void {
    room.status = 'playing';
    room.guessHistory = [];
    room.winner = null;
    room.currentTurn = 'host';
    room.hostSecret = this.generateSecretNumber();
    room.guestSecret = this.generateSecretNumber();
  }

  private generateSecretNumber(): string {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';
    
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      result += digits[randomIndex];
      digits.splice(randomIndex, 1); // Remove used digit to ensure uniqueness
    }
    
    return result;
  }

  public validateGuess(guess: string): boolean {
    if (guess.length !== 4) return false;
    if (!/^\d{4}$/.test(guess)) return false;
    if (guess.includes('0')) return false;
    
    // Check for duplicate digits
    const uniqueDigits = new Set(guess);
    return uniqueDigits.size === 4;
  }

  public calculateFeedback(guess: string, secret: string): { correctPosition: number; correctNumber: number } {
    let correctPosition = 0;
    let correctNumber = 0;
    
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        correctPosition++;
      } else if (secret.includes(guess[i])) {
        correctNumber++;
      }
    }
    
    return { correctPosition, correctNumber };
  }

  public getActiveRoomsCount(): number {
    return this.rooms.size;
  }
}

export default RoomManager;