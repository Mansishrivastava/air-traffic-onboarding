import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { apiService } from "../../services/api";

// const competitors = [
//   { name: "Rogers Stirk Harbour + Parker", url: "https://www.competitorwebsite.com", linkedin: "/Rogers Stirk Harbour+Parker" },
//   { name: "Foster + Partners", url: "https://www.competitorwebsite.com", linkedin: "/Fosterandpartners" },
//   { name: "Make Architects", url: "https://www.competitorwebsite.com", linkedin: "/MakeArchitects" },
//   { name: "David Chipperfield Architects", url: "https://www.competitorwebsite.com", linkedin: "/DavidChipperfieldArchitects" },
//   { name: "Adjaye Associates", url: "https://www.competitorwebsite.com", linkedin: "/AdjayeAssociates" },
// ];

const CompetitorsScreen = () => {
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompetitors = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiService.getCompetitors();
        if (response.error) {
          setError(response.error);
        } else if (Array.isArray(response.data)) {
          setCompetitors(response.data);
        }
      } catch (err) {
        setError("Failed to load competitors.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompetitors();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
      <Sidebar />
      {/* Main content */}
      <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: 'serif' }}>Your Radar</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontWeight: 600 }}>Katie Barker</span>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
              <img src="/profile-photo.png" alt="Katie Barker" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
        <section style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.04)', padding: 32, marginBottom: 80 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Competitors</h3>
          <p style={{ color: '#888', marginBottom: 24 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ex bibendum, rutrum erat non, accumsan mi. Nunc tempor et ex sed iaculis. Aenean pharetra lacus nec interdum viverra.
          </p>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Your Selected Competitors</div>
          {loading ? (
            <div style={{ margin: '24px 0' }}>Loading competitors...</div>
          ) : error ? (
            <div style={{ color: '#ff4444', margin: '24px 0' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
              <thead>
                <tr style={{ background: '#F8F8F8' }}>
                  <th style={{ textAlign: 'left', padding: 12 }}>Name</th>
                  <th style={{ textAlign: 'left', padding: 12 }}>Website URL</th>
                  <th style={{ textAlign: 'left', padding: 12 }}>LinkedIn page</th>
                  <th style={{ padding: 12 }}></th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <tr key={c.name || i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 12 }}>{c.name}</td>
                    <td style={{ padding: 12 }}><a href={c.websiteURL} style={{ color: '#0B0B3B' }}>{c.websiteURL}</a></td>
                    <td style={{ padding: 12 }}>{c.linkedinSlug}</td>
                    <td style={{ padding: 12 }}><a href="#" style={{ color: '#FF7E7E' }}>Edit</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        {/* Wizard tooltip */}
        <div style={{ position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)', background: '#0B0B3B', color: '#fff', borderRadius: 12, padding: '2rem 3rem', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div>Our data collection wizard has identified {competitors.length} potential competitors based on your criteria.</div>
          <button style={{ background: '#FF7E7E', color: '#fff', border: 'none', borderRadius: 16, padding: '0.5rem 2rem', fontWeight: 600 }}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default CompetitorsScreen; 