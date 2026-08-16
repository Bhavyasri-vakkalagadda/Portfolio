import React, { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import ThreeDCanvas from './components/ThreeDCanvas';
import CodingPet from './components/CodingPet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Blog from './components/Blog';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Mouse position for glow effects
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded]);

  return (
    <div className="app">
      {/* 1. Custom Terminal Preloader / Initializing Screen */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* 2. Full 3D Coding-Themed WebGL Background Canvas */}
      <ThreeDCanvas />

      {/* 3. Interactive Coding Pet Mascot ("Byte") */}
      <CodingPet />

      {/* 4. Navigation & Site Content */}
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <div className="reveal"><About /></div>
        <div className="reveal"><Projects /></div>
        <div className="reveal"><Skills /></div>
        <div className="reveal"><Achievements /></div>
        <div className="reveal"><Blog /></div>
        <div className="reveal"><Contact /></div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            Designed & Built with <span className="footer-heart">♥</span> by{' '}
            <a href="https://github.com/Bhavyasri-vakkalagadda" target="_blank" rel="me noopener noreferrer" title="Bhavya Sri Vakkalagadda GitHub Profile">
              Bhavya Sri Vakkalagadda
            </a>{' '}
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
