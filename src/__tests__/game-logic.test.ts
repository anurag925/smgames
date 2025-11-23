// src/__tests__/game-logic.test.ts

import RoomManager from '../lib/room-manager';

describe('RoomManager', () => {
  let roomManager: RoomManager;

  beforeEach(() => {
    roomManager = new RoomManager();
  });

  describe('generateSecretNumber', () => {
    it('should generate a 4-digit number with unique digits', () => {
      const secret = roomManager['generateSecretNumber']();
      
      expect(secret).toHaveLength(4);
      expect(/^[1-9]{4}$/.test(secret)).toBe(true);
      
      // Check for unique digits
      const uniqueDigits = new Set(secret);
      expect(uniqueDigits.size).toBe(4);
    });
  });

  describe('validateGuess', () => {
    it('should return true for a valid 4-digit guess with unique digits', () => {
      expect(roomManager.validateGuess('1234')).toBe(true);
      expect(roomManager.validateGuess('5678')).toBe(true);
    });

    it('should return false for guesses with length other than 4', () => {
      expect(roomManager.validateGuess('123')).toBe(false);
      expect(roomManager.validateGuess('12345')).toBe(false);
    });

    it('should return false for guesses containing zero', () => {
      expect(roomManager.validateGuess('1230')).toBe(false);
      expect(roomManager.validateGuess('0123')).toBe(false);
    });

    it('should return false for guesses with duplicate digits', () => {
      expect(roomManager.validateGuess('1123')).toBe(false);
      expect(roomManager.validateGuess('1213')).toBe(false);
    });

    it('should return false for non-numeric inputs', () => {
      expect(roomManager.validateGuess('abcd')).toBe(false);
      expect(roomManager.validateGuess('12a3')).toBe(false);
    });
  });

  describe('calculateFeedback', () => {
    it('should correctly calculate position and number matches', () => {
      // Test case: guess '1234' against secret '1456'
      // Position match: '1' at position 0
      // Number match: '4' is in secret but wrong position
      const result = roomManager.calculateFeedback('1234', '1456');
      expect(result.correctPosition).toBe(1);
      expect(result.correctNumber).toBe(1);
    });

    it('should return 4 correct positions for exact match', () => {
      const result = roomManager.calculateFeedback('1234', '1234');
      expect(result.correctPosition).toBe(4);
      expect(result.correctNumber).toBe(0);
    });

    it('should return 0 for no matches', () => {
      const result = roomManager.calculateFeedback('1234', '5678');
      expect(result.correctPosition).toBe(0);
      expect(result.correctNumber).toBe(0);
    });

    it('should handle multiple number matches correctly', () => {
      // Guess '1234' against secret '4321'
      // No correct positions, but all 4 digits are in the wrong positions
      const result = roomManager.calculateFeedback('1234', '4321');
      expect(result.correctPosition).toBe(0);
      expect(result.correctNumber).toBe(4);
    });
  });
});