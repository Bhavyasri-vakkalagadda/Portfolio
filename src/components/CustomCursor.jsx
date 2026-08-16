import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState('');

  const ringRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering an interactive element
      const target = e.target;
      const interactiveEl = target.closest('a, button, input, textarea, .btn, .project-card, .social-link, .coding-pet-wrapper, .achievement-card, .blog-card');
      
      if (interactiveEl) {
        setIsHovered(true);
        if (interactiveEl.tagName === 'A') setHoverText('LINK');
        else if (interactiveEl.tagName === 'BUTTON' || interactiveEl.classList.contains('btn')) setHoverText('ACTION');
        else if (interactiveEl.classList.contains('coding-pet-wrapper')) setHoverText('PET ME');
        else setHoverText('VIEW');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth Lerp animation loop for outer cursor ring
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.18;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`;
        ringRef.current.style.top = `${ringPosRef.current.y}px`;
      }
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Fast Snapping Inner Neon Dot */}
      <div
        className={`custom-cursor-dot ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      {/* Smooth Spring Outer Tech Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        {isHovered && <span className="custom-cursor-text-icon">{hoverText || '</>'}</span>}
      </div>
    </>
  );
};

export default CustomCursor;
