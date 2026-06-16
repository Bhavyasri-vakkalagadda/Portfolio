import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Blog from './components/Blog';
import Contact from './components/Contact';
import ParticleField from './components/ParticleField';
import './App.css';

function App() {
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
  }, []);

  return (
    <div className="app">
      <div className="noise-overlay" />
      <ParticleField />
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
            <a href="https://github.com/bhavya-428" target="_blank" rel="noopener noreferrer">
              Bhavya Vakkalagadda
            </a>{' '}
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
