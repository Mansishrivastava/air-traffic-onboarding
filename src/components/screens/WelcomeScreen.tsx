"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../../services/api";

const WelcomeScreen = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      setError("");
      try {
        // Replace '1' with dynamic id if needed
        const response = await apiService.getAccountDetails("1");
        if (response.error) {
          setError(response.error);
        } else if (response.data?.name) {
          setName(response.data.name);
        }
      } catch (err) {
        setError("Failed to load account details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

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
        {loading ? 'Loading...' : error ? 'Welcome!' : `Welcome to Air Traffic Control, ${name || 'User'}`}
      </h1>
      <p style={{
        fontSize: 18,
        marginBottom: 32,
        color: '#555'
      }}>
        Check out this video to learn about how we can help your business through personalized content.
      </p>
      <div style={{ position: 'relative', marginBottom: 40 }}>
        <img
          src="/welcome.svg"
          alt="Mailchimp sign"
          style={{
            width: 480,
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
        disabled={loading}
      >
        Continue
      </button>
      {error && (
        <div style={{ color: '#ff4444', marginTop: 16 }}>{error}</div>
      )}
    </div>
  );
};

export default WelcomeScreen;
