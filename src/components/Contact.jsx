import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Contact Us</h1>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>

            <div className="contact-details">
              <div className="contact-item">
                <h3>📍 Address</h3>
                <p>123 MG Road<br />Bengaluru, Karnataka 560001<br />India</p>
              </div>

              <div className="contact-item">
                <h3>📧 Email</h3>
                <p>info@ourstore.in</p>
              </div>

              <div className="contact-item">
                <h3>📞 Phone</h3>
                <p>+91 98765 43210</p>
              </div>

              <div className="contact-item">
                <h3>🕐 Business Hours</h3>
                <p>Monday - Saturday: 10am - 8pm<br />Sunday: 11am - 6pm</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
