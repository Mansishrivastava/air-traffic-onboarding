import React from "react";
import Sidebar from "../common/Sidebar";

const topics = [
  { topic: "Celebrity news", engagement: "60%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Great", competitorCoverageColor: "#43A047" },
  { topic: "Politics", engagement: "40%", competition: 45, coverage: "Ok", coverageColor: "#FBC02D", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
  { topic: "Barak Obama", engagement: "30%", competition: 45, coverage: "Ok", coverageColor: "#FBC02D", competitorCoverage: "Great", competitorCoverageColor: "#43A047" },
  { topic: "Michelle Obama", engagement: "10%", competition: 75, coverage: "Great", coverageColor: "#43A047", competitorCoverage: "Ok", competitorCoverageColor: "#FBC02D" },
  { topic: "The White House", engagement: "30%", competition: 54, coverage: "Low", coverageColor: "#FB8C00", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
  { topic: "US Presidents", engagement: "40%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
  { topic: "US Presidents", engagement: "60%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Ok", competitorCoverageColor: "#FBC02D" },
  { topic: "US Presidents", engagement: "30%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
  { topic: "US Presidents", engagement: "40%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
];

const barStyle = (color: string) => ({ height: 6, borderRadius: 3, background: color, width: 60 });
const barBgStyle = { height: 6, borderRadius: 3, background: '#E0E0E0', width: 60 };

const TopicsScreen: React.FC = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
    <Sidebar />
    <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: 'serif' }}>Your Topics</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 600 }}>Katie Barker</span>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
            <img src="/profile-photo.png" alt="Katie Barker" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
      <section style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.04)', padding: 32, marginBottom: 80 }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 16 }}>
          <thead>
            <tr style={{ background: 'none' }}>
              <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Topic <span style={{ fontSize: 16 }}>↕</span></th>
              <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Engagement Rate <span style={{ fontSize: 16 }}>↕</span></th>
              <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Topic Competition <span style={{ fontSize: 16 }}>↕</span></th>
              <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Coverage Score <span style={{ fontSize: 16 }}>?</span></th>
              <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Competitor Coverage Score <span style={{ fontSize: 16 }}>?</span></th>
            </tr>
          </thead>
          <tbody>
            {topics.map((t, i) => (
              <tr key={i} style={{ background: '#FAFAFA', borderRadius: 16, boxShadow: '0 1px 0 #E0E0E0', marginBottom: 8 }}>
                <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0', borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}>{t.topic}</td>
                <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0' }}>{t.engagement}</td>
                <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0' }}>{t.competition}</td>
                <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{t.coverage}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={barBgStyle}>
                        <div style={barStyle(t.coverageColor)} />
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0', borderTopRightRadius: 16, borderBottomRightRadius: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{t.competitorCoverage}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={barBgStyle}>
                        <div style={barStyle(t.competitorCoverageColor)} />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div style={{ position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)', background: '#0B0B3B', color: '#fff', borderRadius: 12, padding: '2rem 3rem', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 24, minWidth: 420 }}>
        <div>Our data collection wizard has identified 9 key topics that we believe will resonate with your audiences.</div>
        <button style={{ background: '#FF7E7E', color: '#fff', border: 'none', borderRadius: 16, padding: '0.5rem 2rem', fontWeight: 600 }}>Next</button>
      </div>
    </main>
  </div>
);

export default TopicsScreen; 