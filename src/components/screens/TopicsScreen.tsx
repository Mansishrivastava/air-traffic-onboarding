import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { apiService } from "../../services/api";
import Image from 'next/image';

interface Topic {
  topic: string;
  engagement: string;
  competition: number;
  coverage: string;
  coverageColor: string;
  competitorCoverage: string;
  competitorCoverageColor: string;
}

interface TopicSummary {
  value: string;
  coverageScore: number;
  topicCompetition: number;
}

interface TopicIncidence {
  value: string;
  engagement: number;
}

// const topics = [
//   { topic: "Celebrity news", engagement: "60%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Great", competitorCoverageColor: "#43A047" },
//   { topic: "Politics", engagement: "40%", competition: 45, coverage: "Ok", coverageColor: "#FBC02D", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
//   { topic: "Barak Obama", engagement: "30%", competition: 45, coverage: "Ok", coverageColor: "#FBC02D", competitorCoverage: "Great", competitorCoverageColor: "#43A047" },
//   { topic: "Michelle Obama", engagement: "10%", competition: 75, coverage: "Great", coverageColor: "#43A047", competitorCoverage: "Ok", competitorCoverageColor: "#FBC02D" },
//   { topic: "The White House", engagement: "30%", competition: 54, coverage: "Low", coverageColor: "#FB8C00", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
//   { topic: "US Presidents", engagement: "40%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
//   { topic: "US Presidents", engagement: "60%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Ok", competitorCoverageColor: "#FBC02D" },
//   { topic: "US Presidents", engagement: "30%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
//   { topic: "US Presidents", engagement: "40%", competition: 3, coverage: "Poor", coverageColor: "#E53935", competitorCoverage: "Poor", competitorCoverageColor: "#E53935" },
// ];

const barStyle = (color: string) => ({ height: 6, borderRadius: 3, background: color, width: 60 });
const barBgStyle = { height: 6, borderRadius: 3, background: '#E0E0E0', width: 60 };

const coverageMap = [
  { label: 'Poor', color: '#E53935', min: 0, max: 30 },
  { label: 'Low', color: '#FB8C00', min: 31, max: 50 },
  { label: 'Ok', color: '#FBC02D', min: 51, max: 70 },
  { label: 'Great', color: '#43A047', min: 71, max: 100 },
];

function getCoverage(score: number) {
  for (const c of coverageMap) {
    if (score >= c.min && score <= c.max) return { label: c.label, color: c.color };
  }
  return { label: 'Unknown', color: '#E0E0E0' };
}

const TopicsScreen: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError("");
      try {
        const [summariesRes, incidenceRes, audienceRes] = await Promise.all([
          apiService.getTopicSummaries(),
          apiService.getTopicIncidenceAndEngagement(),
          apiService.getTopicAudienceRelevance(),
        ]);
        if (summariesRes.error || incidenceRes.error || audienceRes.error) {
          setError(summariesRes.error || incidenceRes.error || audienceRes.error || 'Unknown error');
          setLoading(false);
          return;
        }
        // Merge data by topic value
        const summaries = (summariesRes.data as { content?: TopicSummary[] })?.content || [];
        const incidence = Array.isArray(incidenceRes.data) ? incidenceRes.data : [];
        // For this example, we don't use audienceRes directly, but you can add logic as needed
        const merged = summaries.map((s: TopicSummary) => {
          const i = incidence.find((ii: unknown) => (ii as TopicIncidence).value === s.value);
          const coverage = getCoverage(s.coverageScore);
          // For demo, competitorCoverage is randomized
          const competitorCoverage = getCoverage(Math.floor(Math.random() * 100));
          return {
            topic: s.value,
            engagement: i ? `${(i as TopicIncidence).engagement}%` : '-',
            competition: s.topicCompetition,
            coverage: coverage.label,
            coverageColor: coverage.color,
            competitorCoverage: competitorCoverage.label,
            competitorCoverageColor: competitorCoverage.color,
          };
        });
        setTopics(merged);
      } catch {
        setError("Failed to load topics.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
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
          {loading ? (
            <div style={{ margin: '24px 0' }}>Loading topics...</div>
          ) : error ? (
            <div style={{ color: '#ff4444', margin: '24px 0' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 16 }}>
              <thead>
                <tr style={{ background: 'none' }}>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Topic <span style={{ fontSize: 16 }}>
                    <Image src="/updown.svg" alt="updown" width={16} height={16} />
                    </span></th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Engagement Rate <span style={{ fontSize: 16 }}>
                    <Image src="/updown.svg" alt="updown" width={16} height={16} /></span></th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Topic Competition <span style={{ fontSize: 16 }}>
                    <Image src="/updown.svg" alt="updown" width={16} height={16} /></span></th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Coverage Score <span style={{ fontSize: 16 }}>
                    <Image src="/updown.svg" alt="updown" width={16} height={16} />
                    ?</span></th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Competitor Coverage Score <span style={{ fontSize: 16 }}>
                    <Image src="/updown.svg" alt="updown" width={16} height={16} />
                    ?</span></th>
                </tr>
              </thead>
              <tbody>
                {topics.map((t, i) => (
                  <tr key={i} style={{ background: '#FAFAFA', borderRadius: 16, boxShadow: '0 1px 0 #E0E0E0', marginBottom: 8 }}>
                    <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0', borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}>
                      {t.topic}
                    </td>
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
          )}
        </section>
        <div style={{ position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)', background: '#0B0B3B', color: '#fff', borderRadius: 12, padding: '2rem 3rem', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 24, minWidth: 420 }}>
          <div>Our data collection wizard has identified {topics.length} key topics that we believe will resonate with your audiences.</div>
          <button style={{ background: '#FF7E7E', color: '#fff', border: 'none', borderRadius: 16, padding: '0.5rem 2rem', fontWeight: 600 }}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default TopicsScreen; 