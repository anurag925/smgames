#!/bin/sh
set -e

echo "Starting SM Games..."

# Start WebSocket server in background with signal handling
echo "Starting WebSocket server on port ${WS_PORT:-3001}..."
npx tsx server.ts &
WS_PID=$!

# Cleanup function
cleanup() {
    echo "Shutting down..."
    kill -TERM "$WS_PID" 2>/dev/null || true
    exit 0
}

# Handle shutdown signals
trap cleanup TERM INT

# Start Next.js standalone server (exec replaces the shell process)
echo "Starting Next.js server on port ${PORT:-3000}..."
exec node server.js
