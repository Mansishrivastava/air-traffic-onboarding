import React, { useEffect, useState } from 'react';
import styles from './ContactsScreen.module.css';
import Sidebar from '../common/Sidebar';
import { apiService } from '../../services/api';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  insights: number;
  recommendations: number;
}

// const contacts: Contact[] = [
//   {
//     firstName: 'Alyssa',
//     lastName: 'Abbott',
//     email: 'alyssaabbott@reflexarchitects.com',
//     company: 'Reflex Architects',
//     insights: 48,
//     recommendations: 8,
//   },
//   {
//     firstName: 'Patrick',
//     lastName: 'Brumfield',
//     email: 'patrickbrumfeild@pangaeagroup.com',
//     company: 'Pangaea Group',
//     insights: 93,
//     recommendations: 9,
//   },
//   {
//     firstName: 'Nathanial',
//     lastName: 'Gilmore',
//     email: 'nathanialgilmore@dreamdesign.com',
//     company: 'Dream Design',
//     insights: 40,
//     recommendations: 5,
//   },
//   {
//     firstName: 'Olivia',
//     lastName: 'Holderman',
//     email: 'oliviaholderman@atelierlegacy.com',
//     company: 'Atelier Legacy',
//     insights: 59,
//     recommendations: 7,
//   },
//   // Duplicate rows for illustration like in the image
//   {
//     firstName: 'Nathanial',
//     lastName: 'Gilmore',
//     email: 'nathanialgilmore@dreamdesign.com',
//     company: 'Dream Design',
//     insights: 40,
//     recommendations: 5,
//   },
//   {
//     firstName: 'Patrick',
//     lastName: 'Brumfield',
//     email: 'patrickbrumfeild@pangaeagroup.com',
//     company: 'Pangaea Group',
//     insights: 93,
//     recommendations: 9,
//   },
//   {
//     firstName: 'Alyssa',
//     lastName: 'Abbott',
//     email: 'alyssaabbott@reflexarchitects.com',
//     company: 'Reflex Architects',
//     insights: 48,
//     recommendations: 8,
//   },
//   {
//     firstName: 'Olivia',
//     lastName: 'Holderman',
//     email: 'oliviaholderman@atelierlegacy.com',
//     company: 'Atelier Legacy',
//     insights: 59,
//     recommendations: 7,
//   },
// ];

const ContactsScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiService.getContacts();
        if (response.error) {
          setError(response.error);
        } else if (Array.isArray(response.data?.content)) {
          setContacts(response.data.content);
        }
      } catch (err) {
        setError("Failed to load contacts.");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '3rem 4rem', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: 'serif' }}>Contacts</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontWeight: 600 }}>Katie Barker</span>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
              <img src="/profile-photo.png" alt="Katie Barker" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
        <section style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.04)', padding: 32, marginBottom: 80 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Contacts</h3>
          <p style={{ color: '#888', marginBottom: 24 }}>
            View and manage your contacts. Sort by any column to organize your data.
          </p>
          {loading ? (
            <div style={{ margin: '24px 0' }}>Loading contacts...</div>
          ) : error ? (
            <div style={{ color: '#ff4444', margin: '24px 0' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
              <thead>
                <tr style={{ background: '#F8F8F8' }}>
                  <th style={{ textAlign: 'left', padding: 12 }}>First name</th>
                  <th style={{ textAlign: 'left', padding: 12 }}>Last name</th>
                  <th style={{ textAlign: 'left', padding: 12 }}>Email</th>
                  <th style={{ textAlign: 'left', padding: 12 }}>Company</th>
                  <th style={{ textAlign: 'left', padding: 12 }}>Insights</th>
                  <th style={{ textAlign: 'left', padding: 12 }}>Recommendations</th>
                  <th style={{ padding: 12 }}></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 12 }}>{contact.firstName}</td>
                    <td style={{ padding: 12 }}>{contact.lastName}</td>
                    <td style={{ padding: 12 }}><a href={`mailto:${contact.email}`} style={{ color: '#0B0B3B' }}>{contact.email}</a></td>
                    <td style={{ padding: 12 }}>{contact.company}</td>
                    <td style={{ padding: 12 }}>{contact.insights}</td>
                    <td style={{ padding: 12 }}>{contact.recommendations}</td>
                    <td style={{ padding: 12 }}><a href="#" style={{ color: '#FF7E7E' }}>Edit</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <div style={{ position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)', background: '#0B0B3B', color: '#fff', borderRadius: 12, padding: '2rem 3rem', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div>Our data collection wizard has identified <b>{contacts.length}</b> contacts based on your criteria.</div>
          <button style={{ background: '#FF7E7E', color: '#fff', border: 'none', borderRadius: 16, padding: '0.5rem 2rem', fontWeight: 600 }}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default ContactsScreen;
