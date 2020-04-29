import React, { useRef, useEffect } from 'react'

const Canvas = ({
  width,
  height,
  rowsNumber = 15,
  columnsNumber = 15,
  setPixelImageDataUri,
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1

    for (let i = 1; i < rowsNumber; i++) {
      const x = i * (width / rowsNumber)
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let i = 1; i < columnsNumber; i++) {
      const y = i * (width / columnsNumber)
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }, [columnsNumber, height, canvasRef, rowsNumber, width])

  const handleMouseMove = event => {
    let newPosX = event.clientX - canvasRef.current.getBoundingClientRect().left
    let newPosY = event.clientY - canvasRef.current.getBoundingClientRect().top

    const start = 0
    const endX = canvasRef.current.offsetWidth
    const endY = canvasRef.current.offsetHeight

    if (newPosX < start) {
      newPosX = 0
    }

    if (newPosY < start) {
      newPosY = 0
    }

    if (newPosX > endX) {
      newPosX = endX
    }

    if (newPosY > endY) {
      newPosY = endY
    }

    const pixelSize = width / rowsNumber
    const indexX = Math.floor(newPosX / pixelSize)
    const indexY = Math.floor(newPosY / pixelSize)

    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = 'skyblue'
    ctx.fillRect(indexX * pixelSize, indexY * pixelSize, pixelSize, pixelSize)
    setPixelImageDataUri(canvasRef.current.toDataURL('image/png'))
  }

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)
  }

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ background: 'white' }}
      onMouseDown={handleMouseDown}
    />
  )
}

export default Canvas
