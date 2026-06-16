import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      icon: '⚡',
      title: 'Programming',
      skills: ['Python', 'C', 'Data Structures','JavaScript', 'TypeScript']
    },
    {
      icon: '🌐',
      title: 'Web Technologies',
      skills: ['HTML', 'CSS', 'JavaScript', 'React','Bootstrap']
    },
    {
      icon: '🛠️',
      title: 'Tools & Platforms',
      skills: ['VS Code', 'Git', 'Cursor', 'Windsurf', 'Antigravity']
    }
  ];

  const learning = ['Typescript','React','Figma'];
  const toolset = ['VS Code', 'Git', 'Cursor', 'Windsurf', 'Antigravity'];

  return (
    <section id="skills" className="skills-section section-padding">
      <div className="container">
        <div className="skills-header-card glass reveal">
          <span className="section-label">03 — Skills</span>
          <h2 className="section-title">My Top <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">Technologies I use to bring ideas to life.</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-card glass reveal">
              <span className="skill-card-icon">{category.icon}</span>
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-grid" style={{ marginTop: '1.5rem' }}>
          <div className="skill-card glass learning reveal" style={{ gridColumn: '1 / -1' }}>
            <div className="learning-badge">Currently Learning</div>
            <span className="skill-card-icon">🚀</span>
            <h3>Future Frontiers</h3>
            <div className="skill-tags">
              {learning.map((item, idx) => (
                <span key={idx} className="skill-tag learning-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="toolset-marquee reveal">
          <div className="marquee-label">Toolset Stack</div>
          <div className="marquee-track">
            {[...toolset, ...toolset].map((tool, idx) => (
              <span key={idx}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
