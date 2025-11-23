import Link from 'next/link'
import './globals.css'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Welcome to SM Games
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          A collection of fun multiplayer games you can play with friends online
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link 
            href="/games/guess-the-number"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Guess the Number</h2>
            <p className="text-gray-600">A classic number guessing game for 2 players</p>
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 opacity-75">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">More Games</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  )
}