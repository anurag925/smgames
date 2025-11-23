// src/__tests__/room-manager.test.ts

import RoomManager, { GameRoom } from '../lib/room-manager';
import { WebSocket } from 'ws';

// Mock WebSocket
class MockWebSocket {
  readyState: number = WebSocket.OPEN;
  send = jest.fn();
  onclose?: () => void;
}

describe('RoomManager Integration', () => {
  let roomManager: RoomManager;

  beforeEach(() => {
    roomManager = new RoomManager();
  });

  it('should create a room correctly', () => {
    const mockWs = new MockWebSocket() as unknown as WebSocket;
    const room = roomManager.createRoom(mockWs);

    expect(room.id).toBeDefined();
    expect(room.id.length).toBe(6);
    expect(room.players[0]).toBeDefined();
    expect(room.players[1]).toBeNull();
    expect(room.status).toBe('waiting');
    expect(room.hostSecret).toMatch(/^[1-9]{4}$/);
    expect(new Set(room.hostSecret).size).toBe(4); // Unique digits
  });

  it('should add a player to an existing room', () => {
    const mockHostWs = new MockWebSocket() as unknown as WebSocket;
    const mockGuestWs = new MockWebSocket() as unknown as WebSocket;
    
    const room = roomManager.createRoom(mockHostWs);
    const roomId = room.id;
    
    // Add a guest
    const updatedRoom = roomManager.addPlayerToRoom(roomId, mockGuestWs);

    expect(updatedRoom).toBeDefined();
    expect(updatedRoom!.players[0]).toBeDefined(); // Host
    expect(updatedRoom!.players[1]).toBeDefined(); // Guest
    expect(updatedRoom!.status).toBe('playing');
    expect(updatedRoom!.guestSecret).toMatch(/^[1-9]{4}$/);
    expect(new Set(updatedRoom!.guestSecret!).size).toBe(4); // Unique digits
  });

  it('should prevent joining a full room', () => {
    const mockHostWs = new MockWebSocket() as unknown as WebSocket;
    const mockGuestWs = new MockWebSocket() as unknown as WebSocket;
    const mockAnotherGuestWs = new MockWebSocket() as unknown as WebSocket;
    
    const room = roomManager.createRoom(mockHostWs);
    const roomId = room.id;
    
    // Add first guest
    roomManager.addPlayerToRoom(roomId, mockGuestWs);
    
    // Try to add another guest (should fail)
    const result = roomManager.addPlayerToRoom(roomId, mockAnotherGuestWs);

    expect(result).toBeNull();
  });

  it('should allow game reset', () => {
    const mockHostWs = new MockWebSocket() as unknown as WebSocket;
    const mockGuestWs = new MockWebSocket() as unknown as WebSocket;
    
    const room = roomManager.createRoom(mockHostWs);
    const roomId = room.id;
    roomManager.addPlayerToRoom(roomId, mockGuestWs);

    // Add a guess to the history
    room.guessHistory.push({
      guesser: 'host',
      guess: '1234',
      correctPosition: 1,
      correctNumber: 1,
      timestamp: Date.now()
    });

    expect(room.guessHistory.length).toBe(1);

    // Reset the room
    roomManager.resetRoom(room);

    expect(room.status).toBe('playing');
    expect(room.guessHistory.length).toBe(0);
    expect(room.winner).toBeNull();
    expect(room.currentTurn).toBe('host');
    expect(room.hostSecret).toMatch(/^[1-9]{4}$/);
    expect(new Set(room.hostSecret!).size).toBe(4);
    expect(room.guestSecret).toMatch(/^[1-9]{4}$/);
    expect(new Set(room.guestSecret!).size).toBe(4);
  });
});