import React, { useEffect, useState, useRef } from 'react';
import Windows from './Windows';
import './App.css';
import Terminal from './Terminal';

function App() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const windowsRef = useRef(null);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    const rect = windowsRef.current.getBoundingClientRect();
    setMouseOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      const x = event.clientX - mouseOffset.x;
      const y = event.clientY - mouseOffset.y;
      windowsRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div className="General-Windows-container">
       
      
      <div className="windows-container" onMouseDown={handleMouseDown} ref={windowsRef}>
      <Windows />
        <Terminal />
      </div>
    </div>
  );
}

export default App;
