import React, { useState, useMemo } from 'react'
import './App.css'
import Canvas from './Canvas'

function App() {
  const [pixelImageDataUri, setPixelImageDataUri] = useState('')

  const memoizedSetPixelImageDataUri = useMemo(() => setPixelImageDataUri, [])

  return (
    <div className="App">
      <Canvas
        width={500}
        height={500}
        setPixelImageDataUri={memoizedSetPixelImageDataUri}
      />
      <a href={pixelImageDataUri} download="pixel-art.png">
        <button>Download</button>
      </a>
    </div>
  )
}

export default App
