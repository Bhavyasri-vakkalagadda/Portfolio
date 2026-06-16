import React from 'react';
import './Hero.css';
import profilePhoto from '../assets/profile.png';

const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* Ambient orbs */}
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>

      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            Available for Internships & Projects
          </div>

          <p className="hero-greeting">{'> hello, world'}</p>

          <h1 className="hero-title">
          I'm{' '}
          <span className="hero-name gradient-text">Bhavya</span>
          <span className="hero-role">Web Developer · Computer Engineering Student</span>
        </h1>

        <p className="hero-description">
          An enthusiastic computer science student with strong programming skills in Python, 
          eager to contribute to innovative projects and build high-performance web solutions.
        </p>

          <div className="hero-actions">
            <a href="/resume.pdf" className="btn-primary" download>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
            <a href="#contact" className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-container">
            <div className=""></div>
            <div className="photo-wrapper">
              <img src={profilePhoto} alt="Bhavya Vakkalagadda" className="profile-photo" />
            </div>
            <div className="hero-tech-float tech-float-1">⚛ React</div>
            <div className="hero-tech-float tech-float-2">🐍 Python</div>
            <div className="hero-tech-float tech-float-3">🔧 HTML</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
