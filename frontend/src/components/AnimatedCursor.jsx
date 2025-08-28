import { useState, useEffect } from 'react';

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.classList.contains('hoverable')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.classList.contains('hoverable')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <div style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-150 ease-out`}
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        }}
      >
        {/* Main cursor dot */}
        <div
          className={`w-4 h-4 rounded-full transition-all duration-300 bg-purple-700`}
        />
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes ping {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          75%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCursor;
