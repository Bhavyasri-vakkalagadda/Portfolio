import React from 'react';
import './Blog.css';

const Blog = () => {
  const posts = [
    {
      title: 'The Future of AI in Web Development',
      date: 'March 15, 2024',
      excerpt: 'How large language models are changing the way we build and maintain modern web applications.',
      tag: 'AI'
    },
    {
      title: 'Mastering Python for Data Science',
      date: 'February 28, 2024',
      excerpt: 'Essential libraries and techniques for building efficient data pipelines and models.',
      tag: 'Python'
    },
    {
      title: 'Designing for the User: Beyond Aesthetics',
      date: 'January 12, 2024',
      excerpt: 'Exploring the psychology of user experience and how to create intuitive digital products.',
      tag: 'UI/UX'
    }
  ];

  return (
    <section id="blog" className="blog-section section-padding">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">05 — Insights</span>
          <h2 className="section-title">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="section-subtitle">
            My thoughts on technology, design, and the ever-evolving world of software engineering.
          </p>
        </div>

        <div className="blog-grid">
          {posts.map((post, idx) => (
            <article key={idx} className="blog-card glass reveal">
              <span className="blog-number">0{idx + 1}</span>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-tag">{post.tag}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#" className="blog-link">
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
