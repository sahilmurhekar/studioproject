import { useState, useEffect } from 'react'

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    const handleMouseEnter = () => setCursorVariant('hover')
    const handleMouseLeave = () => setCursorVariant('default')

    // Add event listener for mouse movement
    window.addEventListener('mousemove', mouseMove)

    // Add hover effects for elements with cursor-scale class and interactive elements
    const scaleElements = document.querySelectorAll(`
      p,h1,h2,h3,h4,h5,h6,
      .cursor-scale,
      button, 
      a, 
      input, 
      textarea,
      [role="button"]
    `)
    
    scaleElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      scaleElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 9,
      y: mousePosition.y - 8,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 5,
    }
  }

  return (
    <>
      {/* Custom cursor dot */}
      <div
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-100 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${variants[cursorVariant].x}px, ${variants[cursorVariant].y}px) scale(${variants[cursorVariant].scale})`,
        }}
      />
    </>
  )
}

export default AnimatedCursor