import React from 'react';
import styles from './use-cases.module.css';

const UseCases = () => {
  return (
    <div className={styles.container}>
      <h1>Use Cases</h1>
      <div className={styles.casesGrid}>
        <div className={styles.caseCard}>
          <h2>Air Traffic Management</h2>
          <p>Optimize air traffic flow and reduce delays with our advanced management solutions.</p>
        </div>
        <div className={styles.caseCard}>
          <h2>Flight Planning</h2>
          <p>Streamline flight planning processes and improve operational efficiency.</p>
        </div>
        <div className={styles.caseCard}>
          <h2>Weather Integration</h2>
          <p>Make informed decisions with real-time weather data integration.</p>
        </div>
        <div className={styles.caseCard}>
          <h2>Performance Analytics</h2>
          <p>Track and analyze flight performance metrics for continuous improvement.</p>
        </div>
      </div>
    </div>
  );
};

export default UseCases; 