'use client'

import { useState, useEffect, useRef } from 'react'

// Game types
type GameStatus = 'waiting' | 'playing' | 'ended'
type PlayerRole = 'host' | 'guest'

interface PlayerInfo {
  id: string
  role: PlayerRole
  connected: boolean
}

interface GuessEntry {
  guesser: PlayerRole
  guess: string
  correctPosition: number
  correctNumber: number
  timestamp: number
}

interface GameState {
  id: string
  status: GameStatus
  playerRole: PlayerRole | null
  secretNumber: string | null
  guessHistory: GuessEntry[]
  winner: PlayerRole | null
  currentTurn: PlayerRole
  opponentConnected: boolean
  players: [PlayerInfo | null, PlayerInfo | null]
}

export default function GuessTheNumber() {
  const [gameState, setGameState] = useState<GameState>({
    id: '',
    status: 'waiting',
    playerRole: null,
    secretNumber: null,
    guessHistory: [],
    winner: null,
    currentTurn: 'host',
    opponentConnected: false,
    players: [null, null]
  })
  
  const [guess, setGuess] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [inputRoomCode, setInputRoomCode] = useState('')
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const wsRef = useRef<WebSocket | null>(null)

  // Initialize WebSocket connection
  useEffect(() => {
    connectToServer()
    
    // Clean up on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const connectToServer = () => {
    // In a real deployment, we would use the production WebSocket URL
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = process.env.NODE_ENV === 'production' 
      ? `${wsProtocol}//${window.location.host}/api/websocket`
      : 'ws://localhost:3001'
    
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws
    setConnectionStatus('connecting')
    
    ws.onopen = () => {
      console.log('Connected to game server')
      setConnectionStatus('connected')
    }
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        handleServerMessage(data)
      } catch (error) {
        console.error('Error parsing server message:', error)
      }
    }
    
    ws.onclose = () => {
      console.log('Disconnected from game server')
      setConnectionStatus('disconnected')
      // Attempt to reconnect after 3 seconds
      setTimeout(connectToServer, 3000)
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setConnectionStatus('disconnected')
    }
    
    setSocket(ws)
  }

  const handleServerMessage = (data: any) => {
    console.log('Received message from server:', data)
    
    switch (data.type) {
      case 'room_created':
        setGameState(prev => ({
          ...prev,
          id: data.roomId,
          playerRole: data.role,
          status: 'waiting',
          secretNumber: data.secretNumber
        }))
        setRoomCode(data.roomId)
        setIsCreatingRoom(true)
        break
        
      case 'game_state':
        setGameState(prev => ({
          ...prev,
          id: prev.id,
          playerRole: data.role,
          status: data.status,
          secretNumber: data.yourSecret,
          guessHistory: data.guessHistory,
          currentTurn: data.currentTurn,
          opponentConnected: data.opponentConnected,
          players: data.players
        }))
        break
        
      case 'game_update':
        setGameState(prev => ({
          ...prev,
          status: data.status,
          guessHistory: data.guessHistory,
          winner: data.winner,
          currentTurn: data.currentTurn
        }))
        break
        
      case 'game_reset':
        setGameState(prev => ({
          ...prev,
          status: data.status,
          guessHistory: data.guessHistory,
          winner: data.winner,
          currentTurn: data.currentTurn
        }))
        break
        
      case 'opponent_disconnected':
        setGameState(prev => ({
          ...prev,
          opponentConnected: !data.disconnected
        }))
        break
        
      case 'error':
        alert(`Error: ${data.message}`)
        break
        
      default:
        console.log('Unknown message type:', data.type)
    }
  }

  // Create a new game room
  const createRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'create_room' }))
    } else {
      alert('Not connected to server')
    }
  }

  // Join an existing room
  const joinRoom = () => {
    if (!inputRoomCode.trim()) return
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ 
        type: 'join_room', 
        roomId: inputRoomCode 
      }))
    } else {
      alert('Not connected to server')
    }
  }

  // Submit a guess
  const submitGuess = () => {
    if (!guess || guess.length !== 4) {
      alert('Please enter a valid 4-digit number')
      return
    }

    // Check if player is in a room and game is active
    if (!gameState.playerRole || !gameState.id || gameState.status !== 'playing') {
      alert('Game is not active. Please make sure you are in a room and game has started.')
      return
    }

    if (gameState.currentTurn !== gameState.playerRole) {
      alert('Wait for your turn!')
      return
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'make_guess',
        guess
      }))
      setGuess('')
    } else {
      alert('Not connected to server')
    }
  }

  // Handle game reset
  const resetGame = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'reset_game' }))
    } else {
      alert('Not connected to server')
    }
  }

  // Validate guess format
  const validateGuess = (input: string): boolean => {
    if (input.length !== 4) return false
    if (!/^\d{4}$/.test(input)) return false
    if (input.includes('0')) return false
    
    // Check for duplicate digits
    const uniqueDigits = new Set(input)
    if (uniqueDigits.size !== 4) return false
    
    return true
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Guess the Number</h1>
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm ${
              connectionStatus === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : connectionStatus === 'connecting'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {connectionStatus === 'connected' 
                ? 'Connected' 
                : connectionStatus === 'connecting'
                ? 'Connecting...' 
                : 'Disconnected'}
            </div>
            {gameState.id && (
              <div className="text-sm text-gray-600">
                Room: {gameState.id}
              </div>
            )}
          </div>
        </div>
        
        {!gameState.playerRole ? (
          // Game setup screen
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Start a New Game</h2>
            
            <div className="space-y-6">
              <button
                onClick={createRoom}
                disabled={connectionStatus !== 'connected'}
                className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
                  connectionStatus === 'connected'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {connectionStatus === 'connected' 
                  ? 'Create New Room' 
                  : 'Connecting to server...'}
              </button>
              
              {isCreatingRoom && (
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Share this room code with your friend:</p>
                  <div className="text-2xl font-mono font-bold text-blue-600 bg-blue-50 p-3 rounded-lg inline-block">
                    {roomCode}
                  </div>
                </div>
              )}
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Enter Room Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputRoomCode}
                    onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
                    placeholder="XXXXXX"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    maxLength={6}
                    disabled={connectionStatus !== 'connected'}
                  />
                  <button
                    onClick={joinRoom}
                    disabled={connectionStatus !== 'connected'}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      connectionStatus === 'connected'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Game screen
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
            {/* Game status */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium">
                  {gameState.status === 'waiting' && 'Waiting for opponent...'}
                  {gameState.status === 'playing' && (
                    <span>
                      {gameState.currentTurn === gameState.playerRole 
                        ? 'Your turn' 
                        : `${gameState.currentTurn === 'host' ? 'Host' : 'Guest'}'s turn`}
                    </span>
                  )}
                  {gameState.status === 'ended' && (
                    <span className="text-green-600 font-bold">
                      {gameState.winner === gameState.playerRole 
                        ? 'You won!' 
                        : `${gameState.winner === 'host' ? 'Host' : 'Guest'} won!`}
                    </span>
                  )}
                </div>
                {gameState.status === 'playing' && (
                  <div className="text-sm text-gray-500">
                    Position: {gameState.currentTurn === 'host' ? 'Host' : 'Guest'}
                  </div>
                )}
              </div>
              
              {gameState.opponentConnected ? (
                <div className="mt-1 text-sm text-green-600">Opponent connected</div>
              ) : (
                <div className="mt-1 text-sm text-yellow-600">Opponent not connected yet</div>
              )}
            </div>
            
            {/* Game instructions */}
            {gameState.status === 'waiting' && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Game Rules:</h3>
                <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                  <li>Each player thinks of a 4-digit number with unique digits (digits 1-9)</li>
                  <li>Take turns guessing each other's number</li>
                  <li>After each guess, get feedback: how many digits are correct and in the right position, and how many are correct but in the wrong position</li>
                  <li>First to guess the opponent's number wins!</li>
                </ul>
              </div>
            )}
            
            {/* Game board */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Player's secret number (only visible to host) */}
              {gameState.playerRole && gameState.secretNumber && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-medium text-gray-700 mb-2">
                    {gameState.playerRole === 'host' ? 'Your secret number:' : 'Your secret number:'}
                  </h3>
                  <div className="text-2xl font-mono font-bold text-center">
                    {gameState.secretNumber.split('').map((digit, i) => (
                      <span key={i} className="inline-block w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center">
                        {digit}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Game controls */}
              <div>
                {gameState.status === 'playing' && (
                  <div className="mb-4">
                    {gameState.currentTurn === gameState.playerRole ? (
                      <>
                        <label className="block text-gray-700 mb-2">Enter your guess (4 digits, 1-9, no repeats):</label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="1234"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={4}
                            disabled={gameState.status === 'ended'}
                          />
                          <button
                            onClick={submitGuess}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                            disabled={gameState.status === 'ended' || connectionStatus !== 'connected'}
                          >
                            Guess
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600">Waiting for opponent's turn...</p>
                      </div>
                    )}
                  </div>
                )}
                
                {gameState.status === 'ended' && (
                  <div className="mb-4 text-center">
                    <button
                      onClick={resetGame}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Guess history */}
            {gameState.guessHistory.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Guess History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guess</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wrong Position</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {gameState.guessHistory.map((entry, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {entry.guesser === gameState.playerRole ? 'You' : 'Opponent'}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 font-mono">{entry.guess}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600 font-medium">
                            {entry.correctPosition}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-yellow-600 font-medium">
                            {entry.correctNumber}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}