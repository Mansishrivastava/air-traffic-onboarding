import React from 'react';
import styles from './pricing.module.css';
import { useRouter } from 'next/navigation';

const Pricing = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Pricing Plans</h1>
      <div className={styles.pricingGrid}>
        <div className={styles.pricingCard}>
          <h2>Starter</h2>
          <div className={styles.price}>$99<span>/month</span></div>
          <ul className={styles.features}>
            <li>Basic Air Traffic Management</li>
            <li>Up to 100 flights/month</li>
            <li>Basic Analytics</li>
            <li>Email Support</li>
          </ul>
          <button className={styles.ctaButton} onClick={() => router.push('/')}>Get Started</button>
        </div>

        <div className={`${styles.pricingCard} ${styles.popular}`}>
          <div className={styles.popularBadge}>Most Popular</div>
          <h2>Professional</h2>
          <div className={styles.price}>$299<span>/month</span></div>
          <ul className={styles.features}>
            <li>Advanced Air Traffic Management</li>
            <li>Up to 500 flights/month</li>
            <li>Advanced Analytics</li>
            <li>Priority Support</li>
            <li>Weather Integration</li>
          </ul>
          <button className={styles.ctaButton} onClick={() => router.push('/')}>Get Started</button>
        </div>

        <div className={styles.pricingCard}>
          <h2>Enterprise</h2>
          <div className={styles.price}>Custom</div>
          <ul className={styles.features}>
            <li>Custom Air Traffic Solutions</li>
            <li>Unlimited flights</li>
            <li>Custom Analytics</li>
            <li>24/7 Dedicated Support</li>
            <li>API Access</li>
            <li>Custom Integrations</li>
          </ul>
          <button className={styles.ctaButton} onClick={() => router.push('/')}>Contact Sales</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 