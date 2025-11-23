// server.ts - Standalone WebSocket server
import http from 'http';
import GameServer from './src/lib/websocket-server';

const port = process.env.PORT || 3001;
const server = http.createServer();

// Initialize the game server
const gameServer = new GameServer(server);

server.listen(port, () => {
  console.log(`Game server running on port ${port}`);
});