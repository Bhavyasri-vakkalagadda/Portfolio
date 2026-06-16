import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Smart Heart Monitoring',
      category: 'IOT System',
      description: 'Developed an IoT-based heart monitoring system that continuously tracks heart rate in real time.Implemented automated emergency alerts to notify caregivers when abnormal readings are detected.Integrated GPS location tracking to provide accurate location details during emergencies.',
      image: 'https://cdn.britannica.com/25/214625-050-A37D76CC/heart-rate-monitor-illustration-heartbeat.jpg',
      tags: ['IOT', 'GPS', 'Email Alerts', 'Python'],
      link: '#'
    },
    {
      title: 'Foodfuel',
      category: 'Web Development',
      description: 'Created a food delivery platform that streamlines the ordering process from menu selection to doorstep delivery. Features include real-time order tracking, multiple payment methods, order history, and a comprehensive admin dashboard for managing orders, payments, and courier operations.',
      image: 'https://foodfuel.vercel.app/assets/logo-Bdx1UPrk.png',
      tags: ['HTML', 'CSS', 'JavaScript','React'],
      link: 'https://foodfuel.vercel.app'
    },
    {
      title: 'Expense tracker',
      category: 'Web Development',
      description: 'Developed a user-friendly expense tracking application to monitor daily income and expenses efficiently. Implemented features for adding, editing, and categorizing financial transactions. Provided real-time balance calculations and expense summaries to help users manage their finances effectively.',
      image: 'https://img.freepik.com/free-vector/budget-control-concept-illustration_114360-2243.jpg?t=st=1763177499~exp=1763181099~hm=009b605d9f80ed39c30a02296a37d4b25f1fa7a8f2c6ddf9f8b433830671853e&w=740',
      tags: ['HTML', 'CSS', 'JavaScript','React'],
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
            A collection of my recent work and digital explorations.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass reveal">
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay"></div>
                <span className="project-category">{project.category}</span>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link" target={project.link !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
                  View Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
