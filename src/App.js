import React, { useState, useMemo } from 'react'
import { CirclePicker } from 'react-color'

import './App.css'
import Canvas from './Canvas'

function App() {
  const [pixelImageDataUri, setPixelImageDataUri] = useState('')
  const [pixelColor, setPixelColor] = useState('black')

  const memoizedSetPixelImageDataUri = useMemo(() => setPixelImageDataUri, [])

  const colorChangeHanlder = (color, event) => {
    setPixelColor(color.hex)
  }

  return (
    <div className="App">
      <CirclePicker onChangeComplete={colorChangeHanlder} />
      <Canvas
        width={500}
        height={500}
        pixelColor={pixelColor}
        setPixelImageDataUri={memoizedSetPixelImageDataUri}
      />
      <a href={pixelImageDataUri} download="pixel-art.png">
        <button>Download</button>
      </a>
    </div>
  )
}

export default App
