import React from 'react';
import styles from './resources.module.css';

const Resources = () => {
  return (
    <div className={styles.container}>
      <h1>Resources</h1>
      
      <div className={styles.resourceSection}>
        <h2>Documentation</h2>
        <div className={styles.resourceGrid}>
          <div className={styles.resourceCard}>
            <h3>Getting Started Guide</h3>
            <p>Learn the basics of our air traffic management system</p>
            <a href="#" className={styles.resourceLink}>Read More →</a>
          </div>
          <div className={styles.resourceCard}>
            <h3>API Documentation</h3>
            <p>Detailed API reference and integration guides</p>
            <a href="#" className={styles.resourceLink}>Read More →</a>
          </div>
        </div>
      </div>

      <div className={styles.resourceSection}>
        <h2>Blog Posts</h2>
        <div className={styles.resourceGrid}>
          <div className={styles.resourceCard}>
            <h3>Air Traffic Management Best Practices</h3>
            <p>Learn how to optimize your air traffic operations</p>
            <a href="#" className={styles.resourceLink}>Read More →</a>
          </div>
          <div className={styles.resourceCard}>
            <h3>Case Studies</h3>
            <p>Real-world examples of successful implementations</p>
            <a href="#" className={styles.resourceLink}>Read More →</a>
          </div>
        </div>
      </div>

      <div className={styles.resourceSection}>
        <h2>Webinars</h2>
        <div className={styles.resourceGrid}>
          <div className={styles.resourceCard}>
            <h3>System Overview</h3>
            <p>Watch our comprehensive system overview webinar</p>
            <a href="#" className={styles.resourceLink}>Watch Now →</a>
          </div>
          <div className={styles.resourceCard}>
            <h3>Advanced Features</h3>
            <p>Deep dive into advanced system capabilities</p>
            <a href="#" className={styles.resourceLink}>Watch Now →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources; 