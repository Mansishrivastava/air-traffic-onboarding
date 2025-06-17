"use client";
import React from "react";
import { useRouter } from "next/navigation";

const VerifyUrlScreen = () => {
  const router = useRouter();
  const handleContinue = () => router.push("/welcome");

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 2rem' }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, fontFamily: 'serif', marginBottom: 16 }}>Is this your URL?</h1>
        <p style={{ fontSize: 20, marginBottom: 32, color: '#555', textAlign: 'center', maxWidth: 540 }}>
          We have detected this as the URL for your company website. Please verify its accuracy.
        </p>
        <input
          type="text"
          defaultValue="https://www.examplecompany.com"
          style={{ width: 480, fontSize: 20, padding: '1rem', borderRadius: 8, border: '1px solid #eee', marginBottom: 32 }}
        />
        <button onClick={handleContinue} style={{ background: '#FF7E7E', color: '#fff', border: 'none', borderRadius: 24, padding: '0.75rem 3rem', fontWeight: 600, fontSize: 20 }}>Continue</button>
        <p style={{ color: '#888', fontSize: 18, marginTop: 24 }}>
          If you didn&apos;t receive the email, check your spam folder or <a href="#">resend</a>.
        </p>
      </div>
      <div style={{ flex: 1, borderTopLeftRadius: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundImage: 'url(/screen1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Illustration area, can add SVG or images here */}
        <div style={{ position: 'absolute', top: 40, right: 80 }}>
          <span role="img" aria-label="airplane" style={{ fontSize: 64, color: '#FFD580' }}>✈️</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyUrlScreen; 