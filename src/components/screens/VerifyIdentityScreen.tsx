"use client";
import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiService } from "../../services/api";

const VerifyIdentityScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const maskEmail = (email: string) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(""); // Clear error when user types

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (code.every(digit => digit !== '')) {
        handleVerify();
      } else {
        // Focus the first empty input
        const emptyIndex = code.findIndex(digit => digit === '');
        if (emptyIndex !== -1) {
          inputRefs.current[emptyIndex]?.focus();
        }
      }
    } else if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await apiService.verifyUser(email, verificationCode);
      
      if (response.error) {
        setError(response.error);
        return;
      }

      // Success - token is automatically stored by the API service
      if (response.data?.token) {
        console.log('Authentication successful! Token stored.');
        // You can access the token anytime using: apiService.getToken()
      }

      // Redirect to next screen
      router.push('/verify-url');
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 2rem' }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, fontFamily: 'serif', marginBottom: 24 }}>Verify your identity</h1>
        <div style={{ fontSize: 18, color: '#666', marginBottom: 32, textAlign: 'center' }}>
          Enter the 6-digit code sent to<br />
          <span style={{ fontWeight: 600, color: '#222' }}>{maskEmail(email)}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              maxLength={1}
              value={code[i]}
              onChange={(e) => handleInputChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={isLoading}
              style={{
                width: 56,
                height: 56,
                fontSize: 32,
                textAlign: 'center',
                borderRadius: 8,
                border: '1px solid #eee',
                background: '#fff',
                opacity: isLoading ? 0.6 : 1
              }}
            />
          ))}
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
          onClick={handleVerify}
          disabled={!code.every(digit => digit !== '') || isLoading}
          style={{
            background: code.every(digit => digit !== '') && !isLoading ? '#FF7E7E' : '#cccccc',
            color: '#fff',
            border: 'none',
            borderRadius: 24,
            padding: '0.75rem 3rem',
            fontWeight: 600,
            fontSize: 20,
            width: 360,
            marginBottom: 16,
            cursor: code.every(digit => digit !== '') && !isLoading ? 'pointer' : 'not-allowed',
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
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </button>
        <div style={{ fontSize: 16, color: '#222' }}>Didn&apos;t receive the code? <a href="#" style={{ color: '#FF7E7E', textDecoration: 'none' }}>Resend</a></div>
      </div>
      <div 
        style={{ 
          flex: 1, 
          borderTopLeftRadius: 120, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative', 
          backgroundImage: 'url(/screen1.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
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

export default VerifyIdentityScreen; 