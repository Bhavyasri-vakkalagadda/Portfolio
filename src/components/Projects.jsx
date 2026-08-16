import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'FitLife',
      category: 'Client Project',
      description: 'Client project designed and built for health & wellness management, enabling users to monitor daily food diet, calorie intake, workout routines, and real-time BMI metrics with interactive progress analytics.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop',
      tags: ['Client Project', 'React', 'JavaScript', 'BMI Calculator', 'Diet Tracker'],
      link: '#'
    },
    {
      title: 'Smart Heart Monitoring',
      category: 'IoT System',
      description: 'IoT-based health system that tracks heart rate in real time, generates automated emergency caregiver alerts, and provides live GPS location tracking.',
      image: 'https://cdn.britannica.com/25/214625-050-A37D76CC/heart-rate-monitor-illustration-heartbeat.jpg',
      tags: ['IoT', 'GPS', 'Email Alerts', 'Python', 'Sensors'],
      link: '#'
    },
    {
      title: 'Foodfuel',
      category: 'Web Development',
      description: 'Modern food delivery platform streamlining menu ordering, live courier tracking, order history, and an admin dashboard for operations.',
      image: 'https://foodfuel.vercel.app/assets/logo-Bdx1UPrk.png',
      tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'REST API'],
      link: 'https://foodfuel.vercel.app'
    },
    {
      title: 'Expense Tracker',
      category: 'Personal Finance',
      description: 'User-friendly financial management application to track daily income and expenses with real-time balance calculations and visual expense summaries.',
      image: 'https://img.freepik.com/free-vector/budget-control-concept-illustration_114360-2243.jpg?t=st=1763177499~exp=1763181099~hm=009b605d9f80ed39c30a02296a37d4b25f1fa7a8f2c6ddf9f8b433830671853e&w=740',
      tags: ['React', 'JavaScript', 'Finance', 'Charts', 'CSS3'],
      link: 'https://expensetracker04.vercel.app/'
    }
  ];

  return (
    <section id="projects" className="projects-section section-padding">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">02 — Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A collection of my featured client projects, IoT architectures, and full-stack web applications.
          </p>
        </div>

        <div className="projects-stack">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass reveal"
              style={{
                top: `calc(85px + ${index * 20}px)`,
                zIndex: index + 1
              }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay" />
                <span className="project-category">{project.category}</span>
                <span className="project-index">0{index + 1}</span>
              </div>
              <div className="project-info">
                <div className="project-meta-header">
                  <span>PROJECT // 0{index + 1}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    href={project.link}
                    className="project-link"
                    target={project.link !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    View Project
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;



