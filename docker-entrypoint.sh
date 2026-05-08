#!/bin/sh
set -e

echo "Starting SM Games..."

# Start WebSocket server in background
echo "Starting WebSocket server on port ${WS_PORT:-3001}..."
npx tsx server.ts &

# Start Next.js standalone server
echo "Starting Next.js server on port ${PORT:-3000}..."
exec node server.js
