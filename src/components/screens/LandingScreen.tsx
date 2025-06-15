"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./LandingScreen.module.css";
import Image from 'next/image';

const LandingScreen = () => {
  const router = useRouter();
  const handleBookDemo = () => router.push("/create-account");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.svg" alt="Air Traffic Control" width={200} height={40} />
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.link}>Use Cases</a>
          <a href="#" className={styles.link}>Pricing</a>
          <a href="#" className={styles.link}>Resources</a>
          <a href="#" className={styles.link}>Demo</a>
          <button className={styles.signInBtn}>Sign in</button>
          <button onClick={handleBookDemo} className={styles.startBtn}>Start for free</button>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Turn your existing<br />content into warmer<br />pipeline and revenue.
          </h1>
          <p className={styles.heroDesc}>
            Send the most relevant blog post, case study, podcast, or video to each contact in HubSpot every time based on their interests and engagement.
          </p>
          <button onClick={handleBookDemo} className={styles.bookDemoBtn}>Book a Demo</button>
        </div>
        <div>
          <Image src="/landing.png" alt="Demo preview" width={600} height={400} className={styles.heroImg} />
        </div>
      </main>
      <section className={styles.section}>
        <div>
          <h2 className={styles.sectionTitle}>The old way</h2>
          <ul className={styles.sectionList}>
            <li>create an ABM account list</li>
            <li>run manual account research</li>
            <li>create content to support your campaign</li>
            <li>create custom microsites</li>
          </ul>
        </div>
        <div>
          <h2 className={styles.sectionTitle}>The Air Traffic Control way</h2>
          <ul className={styles.sectionList}>
            <li>unlimited accounts and contacts</li>
            <li>automate research across your CRM, LinkedIn, and public outlets</li>
            <li>automatically recommend the best of your <i>existing</i> content for every contact</li>
          </ul>
        </div>
      </section>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee', overflow: 'hidden', position: 'relative' }}>
        <Image src="/profile-photo.png" alt="Katie Barker" fill style={{ objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default LandingScreen; 