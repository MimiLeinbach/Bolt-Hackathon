import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  const handleClick = () => {
    setCount(count + 1)
    setShowMessage(true)
    
    // Hide the message after 2 seconds
    setTimeout(() => setShowMessage(false), 2000)
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">
          Hello, World! 🌍
        </h1>
        
        <p className="subtitle">
          Welcome to your new React site
        </p>
        
        <div className="interactive-section">
          <button 
            className="button"
            onClick={handleClick}
          >
            Click me! ({count})
          </button>
          
          {showMessage && (
            <div className="message">
              ✨ Thanks for clicking! ✨
            </div>
          )}
        </div>
        
        <div className="info-section">
          <h2>What's included:</h2>
          <ul>
            <li>⚡ Vite for fast development</li>
            <li>⚛️ React with TypeScript</li>
            <li>🎨 Clean, modern styling</li>
            <li>🔥 Hot reload for instant updates</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App