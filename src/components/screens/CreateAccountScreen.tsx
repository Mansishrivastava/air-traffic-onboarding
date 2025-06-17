"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../../services/api";

const CreateAccountScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
    setError(""); // Clear error when user types
  };

  const handleCreateAccount = async () => {
    if (!isValidEmail) return;
  
    setIsLoading(true);
    setError("");
  
    try {
      const response = await apiService.createUser(email);
  
      // Redirect even if response is 204 (No Content) – mock redirection for testing
      if (response.status === 204 || (response?.data as { success?: boolean })?.success) {
        setTimeout(() => {
          router.push(`/verify-identity?email=${encodeURIComponent(email)}`);
        }, 1500);
        return;
      }
  
      if (response.error) {
        setError(response.error);
        return;
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
        
        {error && (
          <div style={{ 
            color: '#ff4444', 
            fontSize: 14, 
            marginBottom: 16, 
            textAlign: 'center',
            width: 360 
          }}>
            {error}
          </div>
        )}
        
        <button 
          onClick={handleCreateAccount} 
          disabled={!isValidEmail || isLoading}
          style={{ 
            background: isValidEmail && !isLoading ? '#FF7E7E' : '#cccccc',
            color: '#fff', 
            border: 'none', 
            borderRadius: 24, 
            padding: '0.75rem 3rem', 
            fontWeight: 600, 
            fontSize: 20, 
            width: 360, 
            marginBottom: 16,
            cursor: isValidEmail && !isLoading ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          {isLoading ? (
            <>
              <div style={{
                width: 20,
                height: 20,
                border: '2px solid #fff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </button>
        
        <div style={{ fontSize: 16, color: '#222' }}>Already have an account? <a href="#" style={{ color: '#FF7E7E', textDecoration: 'none' }}>Sign in</a></div>
      </div>
      <div style={{ flex: 1, borderTopLeftRadius: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundImage: 'url(/screen1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CreateAccountScreen; 