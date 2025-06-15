import React, { useState } from 'react';
import styles from './demo.module.css';

const Demo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Request a Demo</h1>
      
      <div className={styles.demoContent}>
        <div className={styles.features}>
          <h2>See Our Platform in Action</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>Real-time Monitoring</h3>
              <p>Experience our advanced air traffic monitoring capabilities</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Smart Analytics</h3>
              <p>Discover how our analytics can optimize your operations</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Custom Solutions</h3>
              <p>Learn about our customizable features for your needs</p>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.demoForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Request Demo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Demo; 