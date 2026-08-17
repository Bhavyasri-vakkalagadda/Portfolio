import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">01 — About</span>
          <h2 className="section-title">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="card-bio glass reveal">
            <p className="about-intro">
              <span className="wave">👋</span> Hey, I'm Bhavya Sri Vakkalagadda!
            </p>
            <p className="about-text">
              I'm an enthusiastic <span className="highlight">Computer Engineering</span> student who is passionate about 
              applying technical knowledge to solve real-world problems.
            </p>
            <p className="about-text">
              My goal is to contribute to innovative projects as a <span className="highlight">Web Developer</span>. 
              I focus on building pixel-perfect, performant experiences with a strong foundation 
              in Python and web technologies.
            </p>
          </div>

          <div className="card-stat glass reveal reveal-delay-2">
            <span className="stat-icon">🎓</span>
            <span className="stat-number">8.82</span>
            <span className="stat-label">Diploma CGPA <br/> <span>Kallam Haranadha Reddy Institute of Technology</span></span>
          </div>

          <div className="card-stat glass reveal reveal-delay-3">
            <span className="stat-icon">🏫</span>
            <span className="stat-number">8.73</span>
            <span className="stat-label">SSC CGPA <br/> <span>Sri Majety High School</span></span>
          </div>

          <div className="card-stat glass reveal reveal-delay-4">
            <span className="stat-icon">⏳</span>
            <span className="stat-number">6+</span>
            <span className="stat-label">months of Experience</span>
          </div>

          <div className="card-stat glass reveal reveal-delay-1">
            <span className="stat-icon">🚀</span>
            <span className="stat-number">5+</span>
            <span className="stat-label">Projects Built</span>
          </div>

          <div className="about-chips reveal">
            <div className="about-chip">
              <span className="chip-icon">📍</span> Guntur, Andhra Pradesh, India
            </div>
            <div className="about-chip">
              <span className="chip-icon">🎓</span> CSE Diploma
            </div>
            <div className="about-chip">
              <span className="chip-icon">💼</span> Open to Work
            </div>
            <div className="about-chip">
              <span className="chip-icon">⚡</span> Fast Learner
            </div>
            <div className="about-chip">
              <span className="chip-icon">🎯</span> Detail Oriented
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
