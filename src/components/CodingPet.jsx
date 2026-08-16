import React, { useEffect, useState, useRef } from 'react';
import './CodingPet.css';

const CodingPet = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHopping, setIsHopping] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [speechBubble, setSpeechBubble] = useState('Beep boop! 🐾 Welcome to my Portfolio!');
  const [showBubble, setShowBubble] = useState(true);
  const [sparkles, setSparkles] = useState([]);
  const petRef = useRef(null);

  const developerMessages = [
    'Beep boop! 🚀 Exploring Bhavya Sri\'s work?',
    'React 19 & 3D WebGL active! ⚡',
    'Check out the IoT & Web Projects! 💡',
    'Coffee level: 100% ☕',
    'Need a developer? Let\'s connect! ✉️',
    'Coding with clean architecture! 💻',
    'Click me for a happy hop! ✨',
  ];

  // Natural Eye Blinking Timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, Math.random() * 3000 + 3500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Pupil Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!petRef.current) return;
      const rect = petRef.current.getBoundingClientRect();
      const petCenterX = rect.left + rect.width / 2;
      const petCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - petCenterX;
      const deltaY = e.clientY - petCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(6, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 45);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section Change Detection (Hops & Updates Speech Bubble when scrolling into sections)
  useEffect(() => {
    let lastSection = '';
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'achievements', 'blog', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            if (lastSection !== sectionId) {
              lastSection = sectionId;
              triggerSectionReaction(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerSectionReaction = (sectionId) => {
    triggerHop();
    switch (sectionId) {
      case 'home':
        setSpeechBubble('Hi there! I\'m Byte, your coding assistant! 👋');
        break;
      case 'about':
        setSpeechBubble('Engineering student & passionate builder! 🎓');
        break;
      case 'projects':
        setSpeechBubble('Awesome IoT & Web projects ahead! 🚀');
        break;
      case 'skills':
        setSpeechBubble('Python, React, JS & IoT Tech Stack! ⚡');
        break;
      case 'achievements':
        setSpeechBubble('Continuous learning & GitHub activity! 💻');
        break;
      case 'blog':
        setSpeechBubble('Sharing insights & tech updates! 📝');
        break;
      case 'contact':
        setSpeechBubble('Drop a message! Inbox is open! ✉️');
        break;
      default:
        break;
    }
    setShowBubble(true);
  };

  const triggerHop = () => {
    setIsHopping(true);
    setTimeout(() => setIsHopping(false), 500);
  };

  const handlePetClick = (e) => {
    triggerHop();
    const randomMsg = developerMessages[Math.floor(Math.random() * developerMessages.length)];
    setSpeechBubble(randomMsg);
    setShowBubble(true);

    // Spawn Sparkle Particles
    const emojiList = ['✨', '💖', '⚡', '💻', '🚀', '🐾'];
    const newSparkle = {
      id: Date.now(),
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      x: (Math.random() - 0.5) * 40,
    };
    setSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 800);
  };

  return (
    <div className="coding-pet-container" ref={petRef}>
      {/* Speech Bubble */}
      {showBubble && (
        <div className="pet-speech-bubble">
          <span>{speechBubble}</span>
        </div>
      )}

      {/* Floating Sparkles on Click */}
      {sparkles.map((sp) => (
        <span
          key={sp.id}
          className="click-sparkle"
          style={{ left: `calc(50% + ${sp.x}px)`, top: '-20px' }}
        >
          {sp.emoji}
        </span>
      ))}

      {/* Pet Body & Animations */}
      <div
        className="coding-pet-wrapper"
        onClick={handlePetClick}
        onMouseEnter={() => setShowBubble(true)}
        title="Click Byte for a happy hop!"
      >
        <div className={`coding-pet-body-float ${isHopping ? 'hopping' : ''}`}>
          <svg width="90" height="95" viewBox="0 0 110 115" fill="none">
            <defs>
              <linearGradient id="petGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f3ff" />
                <stop offset="50%" stopColor="#7000ff" />
                <stop offset="100%" stopColor="#b026ff" />
              </linearGradient>

              <linearGradient id="petBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <filter id="visorGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Antenna & Beacon */}
            <line x1="55" y1="26" x2="55" y2="12" stroke="#00f3ff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="55" cy="10" r="5.5" fill="#00f3ff" filter="url(#visorGlow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Cute Ears */}
            <path d="M 28 34 L 14 18 L 36 28 Z" fill="url(#petGrad)" />
            <path d="M 82 34 L 96 18 L 74 28 Z" fill="url(#petGrad)" />

            {/* Head & Body Outer Box */}
            <rect
              x="20"
              y="28"
              width="70"
              height="65"
              rx="28"
              fill="url(#petBody)"
              stroke="url(#petGrad)"
              strokeWidth="2.5"
            />

            {/* Visor Display Screen */}
            <rect
              x="28"
              y="38"
              width="54"
              height="36"
              rx="16"
              fill="#080d1a"
              stroke="rgba(0, 243, 255, 0.4)"
              strokeWidth="1.5"
            />

            {/* Big Expressive Pupil-Tracking Eyes */}
            {!isBlinking ? (
              <g filter="url(#visorGlow)">
                {/* Left Eye */}
                <circle cx="43" cy="54" r="7.5" fill="#00f3ff" />
                <circle
                  cx={43 + pupilOffset.x}
                  cy={54 + pupilOffset.y}
                  r="3.5"
                  fill="#ffffff"
                />

                {/* Right Eye */}
                <circle cx="67" cy="54" r="7.5" fill="#00f3ff" />
                <circle
                  cx={67 + pupilOffset.x}
                  cy={54 + pupilOffset.y}
                  r="3.5"
                  fill="#ffffff"
                />
              </g>
            ) : (
              /* Blinking Eyes (Happy Arcs) */
              <g filter="url(#visorGlow)">
                <path d="M 37 54 Q 43 48 49 54" stroke="#00f3ff" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 61 54 Q 67 48 73 54" stroke="#00f3ff" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Cute Rosy Cheeks */}
            <circle cx="36" cy="62" r="3" fill="rgba(255, 0, 128, 0.5)" />
            <circle cx="74" cy="62" r="3" fill="rgba(255, 0, 128, 0.5)" />

            {/* Happy Smile */}
            <path d="M 50 64 Q 55 68 60 64" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Floating Mini Glowing Keyboard & Typing Paws */}
            <rect x="30" y="88" width="50" height="9" rx="4" fill="rgba(0, 243, 255, 0.2)" stroke="#00f3ff" strokeWidth="1" />
            <circle cx="42" cy="86" r="3.5" fill="#00f3ff">
              <animate attributeName="cy" values="86;84;86" dur="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="68" cy="86" r="3.5" fill="#00f3ff">
              <animate attributeName="cy" values="84;86;84" dur="0.3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Soft Glowing Ground Shadow */}
        <div className="pet-shadow" />
      </div>

      {/* Online Badge */}
      <div className="pet-badge">
        <span className="status-dot-pulse" />
        <span>Byte • Online</span>
      </div>
    </div>
  );
};

export default CodingPet;
