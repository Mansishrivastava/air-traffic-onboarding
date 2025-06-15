"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const WelcomeScreen = () => {
  const router = useRouter();

  const handleSubmit = () => {
    if (router?.push) {
      router.push("/competitors");
    } else {
      console.warn("router.push not available (Storybook?)");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8F8F8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        fontSize: 48,
        fontWeight: 900,
        fontFamily: 'serif',
        marginBottom: 16
      }}>
        Welcome to Air Traffic Control, Katie
      </h1>
      <p style={{
        fontSize: 18,
        marginBottom: 32,
        color: '#555'
      }}>
        Check out this video to learn about how we can help your business through personalized content.
      </p>
      <div style={{ position: 'relative', marginBottom: 40 }}>
        <Image
          src="/welcome.svg"
          alt="Mailchimp sign"
          width={480}
          height={320}
          style={{
            borderRadius: 24,
            boxShadow: '0 4px 32px rgba(0,0,0,0.08)'
          }}
        />
        <button
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            color: '#0B0B3B',
            border: 'none',
            borderRadius: 12,
            padding: '1rem 2rem',
            fontWeight: 600,
            fontSize: 18,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          Watch video
        </button>
      </div>
      <button
        onClick={handleSubmit}
        style={{
          background: '#FF7E7E',
          color: '#fff',
          border: 'none',
          borderRadius: 24,
          padding: '0.75rem 3rem',
          fontWeight: 600,
          fontSize: 20
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default WelcomeScreen;
