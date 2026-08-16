import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const terminalLines = [
    '> sys.init() -- target: PORTFOLIO_CORE',
    '> compiling 3D background & WebGL shaders...',
    '> booting mascot daemon [Byte v2.0]...',
    '> mounting neural grid: [Hero, Work, Growth, Contact]',
    '> status: 100% READY _'
  ];

  // Derive current terminal line directly from progress percentage (no effect restart!)
  const currentLineIndex = Math.min(
    terminalLines.length - 1,
    progress >= 98 ? 4 : progress > 75 ? 3 : progress > 45 ? 2 : progress > 20 ? 1 : 0
  );

  useEffect(() => {
    // Single uninterrupted progress counter (0 to 100%)
    const duration = 2200;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // match CSS exit transition duration
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Ring calculations
  const radius = 65;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`preloader-overlay ${isExiting ? 'exiting' : ''}`}>
      <div className="preloader-scanlines" />
      <div className="preloader-glow-orb" />

      <div className="preloader-content">
        {/* Upper Mascot + Progress Ring */}
        <div className="preloader-center-group">
          {/* Pet Mascot in Preloader */}
          <div className="preloader-mascot-box">
            <div className="preloader-mascot-badge">
              <span className="gear-spin">⚙</span> BYTE LOADING...
            </div>
            {/* Cute Preloader Mascot SVG */}
            <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
              <defs>
                <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#b026ff" />
                </linearGradient>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a233a" />
                  <stop offset="100%" stopColor="#0d111a" />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Antenna */}
              <line x1="60" y1="28" x2="60" y2="14" stroke="#00f3ff" strokeWidth="3" strokeLinecap="round" />
              <circle cx="60" cy="12" r="5" fill="#00f3ff" filter="url(#neonGlow)">
                <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
              </circle>

              {/* Ears */}
              <path d="M 32 36 L 20 22 L 38 32 Z" fill="url(#preloaderGrad)" />
              <path d="M 88 36 L 100 22 L 82 32 Z" fill="url(#preloaderGrad)" />

              {/* Head / Body */}
              <rect x="25" y="30" width="70" height="60" rx="26" fill="url(#bodyGrad)" stroke="url(#preloaderGrad)" strokeWidth="2.5" />

              {/* Visor Screen */}
              <rect x="33" y="40" width="54" height="34" rx="14" fill="#060911" stroke="rgba(0, 243, 255, 0.4)" strokeWidth="1.5" />

              {/* Eyes - Blinking & Looking Busy */}
              <g filter="url(#neonGlow)">
                <circle cx="48" cy="56" r="6" fill="#00f3ff">
                  <animate attributeName="scaleY" values="1;1;0.1;1" keyTimes="0;0.45;0.5;0.55" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="72" cy="56" r="6" fill="#00f3ff">
                  <animate attributeName="scaleY" values="1;1;0.1;1" keyTimes="0;0.45;0.5;0.55" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Happy Mouth / Cheeks */}
              <path d="M 54 64 Q 60 68 66 64" stroke="#b026ff" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="40" cy="62" r="3" fill="rgba(255, 0, 128, 0.5)" />
              <circle cx="80" cy="62" r="3" fill="rgba(255, 0, 128, 0.5)" />

              {/* Typing Paws & Tiny Holographic Keyboard */}
              <rect x="36" y="86" width="48" height="8" rx="4" fill="rgba(0, 243, 255, 0.2)" stroke="#00f3ff" strokeWidth="1" />
              <circle cx="46" cy="84" r="3" fill="#00f3ff">
                <animate attributeName="cy" values="84;82;84" dur="0.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="74" cy="84" r="3" fill="#00f3ff">
                <animate attributeName="cy" values="82;84;82" dur="0.3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Progress Ring */}
          <div className="progress-ring-container">
            <svg className="progress-ring-svg" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="50%" stopColor="#b026ff" />
                  <stop offset="100%" stopColor="#00ff88" />
                </linearGradient>
              </defs>
              <circle
                className="progress-ring-bg"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx="70"
                cy="70"
                fill="none"
              />
              <circle
                className="progress-ring-circle"
                stroke="url(#ringGrad)"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx="70"
                cy="70"
                fill="none"
              />
            </svg>
            <div className="progress-text-center">
              <span className="progress-percent-val">{progress}%</span>
              <span className="progress-label">BUILDING</span>
            </div>
          </div>
        </div>

        {/* Terminal Log Console */}
        <div className="preloader-terminal">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
            <span className="terminal-title">bhavya-os -- bash (zsh)</span>
          </div>
          <div className="terminal-body">
            {terminalLines.slice(0, currentLineIndex + 1).map((line, idx) => (
              <div
                key={idx}
                className={`terminal-line ${idx === currentLineIndex ? 'active' : ''}`}
              >
                <span>{line}</span>
                {idx === currentLineIndex && <span className="blinking-cursor" />}
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="preloader-title-box">
          <div className="preloader-name">Bhavya Vakkalagadda</div>
          <div className="preloader-subtext">3D Web Developer & Computer Engineer</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
