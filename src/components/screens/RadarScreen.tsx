import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { apiService } from "../../services/api";

// const overview = [
//   { label: "New personalized engagements", value: "140", change: "+16%", changeColor: "#43A047", bg: "#F5F6FA" },
//   { label: "Personalized content engagement rate", value: "120%", change: "-4%", changeColor: "#E53935", bg: "#F5F6FA", sub: "vs. non-personalized" },
//   { label: "Personalization score", value: "B+", change: "+", changeColor: "#43A047", bg: "#F5F6FA", sub: <span style={{ color: '#E53935', fontSize: 14 }}>How can I improve my score?</span> },
//   { label: "Content Influenced Revenue", value: "$10K", change: "-4%", changeColor: "#E53935", bg: "#F5F6FA" },
// ];

// const recommendedTopics = [
//   { topic: "Celebrity news", contacts: 369, incidence: 2 },
//   { topic: "Politics", contacts: 5038, incidence: 4 },
//   { topic: "Barak Obama", contacts: 7503, incidence: 7 },
//   { topic: "Barak Obama", contacts: 7503, incidence: 7 },
// ];

const RadarScreen: React.FC = () => {
  // State for overview cards
  const [overview, setOverview] = useState<any>({
    newPersonalizedEngagements: null,
    personalizedContentEngagementRate: null,
    personalizationScore: null,
    contentInfluencedRevenue: null,
  });
  // State for recommended topics
  const [recommendedTopics, setRecommendedTopics] = useState<any[]>([]);
  // State for user name
  const [userName, setUserName] = useState<string>("");
  const [nameLoading, setNameLoading] = useState(true);
  const [nameError, setNameError] = useState<string | null>(null);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      setNameLoading(true);
      setNameError(null);
      try {
        // Replace '1' with dynamic id if needed
        const response = await apiService.getAccountDetails("1");
        if (response.error) {
          setNameError(response.error);
        } else if (response.data?.name) {
          setUserName(response.data.name);
        }
      } catch (err) {
        setNameError("Failed to load account details.");
      } finally {
        setNameLoading(false);
      }
    };
    fetchName();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all overview data in parallel
        const [
          newEngRes,
          engagementRateRes,
          scoreRes,
          revenueRes,
          topicsRes
        ] = await Promise.all([
          apiService.getNewPersonalizedEngagementsScore(),
          apiService.getPersonalizedContentEngagementRate(),
          apiService.getPersonalizationScore(),
          apiService.getContentInfluencedRevenue(),
          apiService.getTopicsToWriteAbout()
        ]);

        setOverview({
          newPersonalizedEngagements: newEngRes.data?.[0] || null,
          personalizedContentEngagementRate: engagementRateRes.data?.[0] || null,
          personalizationScore: scoreRes.data?.[0] || null,
          contentInfluencedRevenue: revenueRes.data?.[0] || null,
        });
        setRecommendedTopics(
          (topicsRes.data || []).map((t: any) => ({
            topic: t.value,
            contacts: t.contactIncidence,
            incidence: t.topicIncidence,
          }))
        );
      } catch (err: any) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || nameLoading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  if (error || nameError) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'red' }}>{error || nameError}</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: 'serif' }}>Your Radar</h2>
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, fontFamily: 'serif', marginBottom: 16 }}>Welcome {userName ? userName : "!"}</div>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
          {/* Overview Cards */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 1px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ background: '#E8F5E9', color: '#43A047', fontWeight: 700, borderRadius: 8, padding: '2px 10px', fontSize: 16, marginBottom: 8 }}>{overview.newPersonalizedEngagements?.changePercentage ? `${overview.newPersonalizedEngagements.changePercentage * 100}%` : ''}</span>
            <span style={{ fontSize: 48, fontWeight: 900, fontFamily: 'serif' }}>{overview.newPersonalizedEngagements?.engagements ?? '-'}</span>
            <span style={{ color: '#888', fontWeight: 500, fontSize: 16 }}>New personalized engagements</span>
          </div>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 1px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ background: '#FFEBEE', color: '#E53935', fontWeight: 700, borderRadius: 8, padding: '2px 10px', fontSize: 16, marginBottom: 8 }}>{overview.personalizedContentEngagementRate?.changePercentage ? `${overview.personalizedContentEngagementRate.changePercentage * 100}%` : ''}</span>
            <span style={{ fontSize: 48, fontWeight: 900, fontFamily: 'serif' }}>{overview.personalizedContentEngagementRate?.engagementRate ? `${overview.personalizedContentEngagementRate.engagementRate}%` : '-'}</span>
            <span style={{ color: '#888', fontWeight: 500, fontSize: 16 }}>Personalized content engagement rate</span>
            <span style={{ color: '#E53935', fontSize: 14 }}>vs. non-personalized</span>
          </div>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 1px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ background: '#E8F5E9', color: '#43A047', fontWeight: 700, borderRadius: 8, padding: '2px 10px', fontSize: 16, marginBottom: 8 }}>{overview.personalizationScore?.score ?? ''}</span>
            <span style={{ fontSize: 48, fontWeight: 900, fontFamily: 'serif' }}>{overview.personalizationScore?.score ?? '-'}</span>
            <span style={{ color: '#888', fontWeight: 500, fontSize: 16 }}>Personalization score</span>
            <span style={{ color: '#E53935', fontSize: 14 }}>How can I improve my score?</span>
          </div>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 1px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ background: '#FFEBEE', color: '#E53935', fontWeight: 700, borderRadius: 8, padding: '2px 10px', fontSize: 16, marginBottom: 8 }}>{overview.contentInfluencedRevenue?.changePercentage ? `${overview.contentInfluencedRevenue.changePercentage * 100}%` : ''}</span>
            <span style={{ fontSize: 48, fontWeight: 900, fontFamily: 'serif' }}>{overview.contentInfluencedRevenue?.revenue ? `$${overview.contentInfluencedRevenue.revenue}` : '-'}</span>
            <span style={{ color: '#888', fontWeight: 500, fontSize: 16 }}>Content Influenced Revenue</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Recommended topics table */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Recommended topics to write about</div>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 16, background: '#fff', borderRadius: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.03)' }}>
              <thead>
                <tr style={{ background: 'none' }}>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Topic</th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Contacts</th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#888', fontWeight: 600 }}>Topic Incidence</th>
                </tr>
              </thead>
              <tbody>
                {recommendedTopics.map((t, i) => (
                  <tr key={i} style={{ background: '#FAFAFA', borderRadius: 16 }}>
                    <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0', borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}>{t.topic}</td>
                    <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0' }}>{t.contacts}</td>
                    <td style={{ padding: '16px 12px', borderBottom: '1px solid #E0E0E0', borderTopRightRadius: 16, borderBottomRightRadius: 16 }}>{t.incidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Placeholder for topic radar and content to promote */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ background: '#23235B', borderRadius: 24, height: 320, marginBottom: 24, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20 }}>
              Topic radar (placeholder)
            </div>
            <div style={{ background: '#fff', borderRadius: 24, minHeight: 160, color: '#23235B', padding: 24, fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Content to promote (placeholder)
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RadarScreen; 