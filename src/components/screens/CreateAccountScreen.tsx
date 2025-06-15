"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateAccountScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleCreateAccount = () => {
    if (isValidEmail) {
      setShowEmail(true);
      setTimeout(() => {
        router.push(`/verify-identity?email=${encodeURIComponent(email)}`);
      }, 1500);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 2rem' }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, fontFamily: 'serif', marginBottom: 24 }}>Create a new account</h1>
        <div style={{ width: 360, marginBottom: 16 }}>
          <label htmlFor="email" style={{ fontWeight: 600, fontSize: 16 }}>Email Address</label>
          <input 
            id="email" 
            type="email" 
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email" 
            style={{ 
              width: '100%', 
              marginTop: 8, 
              marginBottom: 8, 
              padding: '1rem', 
              borderRadius: 8, 
              border: `1px solid ${isValidEmail ? '#4CAF50' : '#eee'}`,
              fontSize: 18 
            }} 
          />
          <div style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Use your work email address</div>
        </div>
        <button 
          onClick={handleCreateAccount} 
          disabled={!isValidEmail}
          style={{ 
            background: isValidEmail ? '#FF7E7E' : '#cccccc',
            color: '#fff', 
            border: 'none', 
            borderRadius: 24, 
            padding: '0.75rem 3rem', 
            fontWeight: 600, 
            fontSize: 20, 
            width: 360, 
            marginBottom: 16,
            cursor: isValidEmail ? 'pointer' : 'not-allowed'
          }}
        >
          Create account
        </button>
        <div style={{ fontSize: 16, color: '#222' }}>Already have an account? <a href="#" style={{ color: '#FF7E7E', textDecoration: 'none' }}>Sign in</a></div>
      </div>
      <div style={{ flex: 1, borderTopLeftRadius: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundImage: 'url(/screen1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
    </div>
  );
};

export default CreateAccountScreen; 