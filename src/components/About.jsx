import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About Us</h1>
        
        <section className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Welcome to our e-commerce store! We started with a simple mission: 
              to provide high-quality products at affordable prices while delivering 
              exceptional customer service.
            </p>
            <p>
              Since our founding, we've helped thousands of customers find the perfect 
              products for their needs. From electronics to fashion, we carefully curate 
              our selection to ensure we offer only the best items available.
            </p>
          </div>
          
          <div className="about-values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Quality</h3>
                <p>We never compromise on quality and only source from trusted suppliers.</p>
              </div>
              <div className="value-item">
                <h3>Customer First</h3>
                <p>Your satisfaction is our top priority. We're here to help you succeed.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>We constantly seek new ways to improve your shopping experience.</p>
              </div>
              <div className="value-item">
                <h3>Integrity</h3>
                <p>We believe in transparency and honest business practices.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">JD</div>
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">JS</div>
              <h3>Jane Smith</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">MB</div>
              <h3>Mike Brown</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </section>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            To make online shopping simple, enjoyable, and accessible to everyone 
            while building lasting relationships with our customers based on trust 
            and exceptional service.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
