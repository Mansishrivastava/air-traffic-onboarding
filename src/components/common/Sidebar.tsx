import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Radar', route: '/radar', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2" fill="none" /><circle cx="10" cy="10" r="2" fill="#fff" /></svg>
  ) },
  { label: 'Topics', route: '/topics', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="3" rx="1.5" fill="#fff" /><rect x="3" y="12" width="14" height="3" rx="1.5" fill="#fff" /></svg>
  ) },
  { label: 'Content', route: '/content', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="12" rx="2" stroke="#fff" strokeWidth="2" fill="none" /><rect x="7" y="7" width="6" height="6" rx="1" fill="#fff" /></svg>
  ) },
  { label: 'Contacts', route: '/contacts', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="8" r="4" stroke="#fff" strokeWidth="2" fill="none" /><path d="M3 17c0-2.5 3-4 7-4s7 1.5 7 4" stroke="#fff" strokeWidth="2" fill="none" /></svg>
  ) },
  { label: 'Competition', route: '/competitors', icon: (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><polygon points="10,3 13,17 10,14 7,17" stroke="#fff" strokeWidth="2" fill="none" /></svg>
  ) },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname || '/competitors';

  return (
    <aside style={{ width: 260, background: '#0B0B3B', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0', borderTopRightRadius: 40, minHeight: '100vh' }}>
      <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 48, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'serif', fontWeight: 900, fontSize: 40 }}>A</span>
        <span style={{ fontFamily: 'serif', fontWeight: 700 }}>ir Traffic Control</span>
      </div>
      <nav style={{ width: '100%' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => {
            const isActive = currentPath === item.route;
            return (
              <li
                key={item.label}
                style={{
                  background: isActive ? '#23235B' : 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: 12,
                  margin: '0.5rem 0',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  color: isActive ? '#fff' : '#E0E0F0',
                  fontSize: 18,
                }}
                onClick={() => router.push(item.route)}
              >
                <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ width: '100%', padding: '0 2rem', marginBottom: 24 }}>
        <button style={{ background: '#FF7E7E', color: '#fff', border: 'none', borderRadius: 16, padding: '0.75rem 0', fontWeight: 600, width: '100%', fontSize: 18 }}>Upgrade</button>
      </div>
      <div style={{ color: '#B0B0D0', opacity: 1, fontSize: 16, marginBottom: 8, width: '100%', paddingLeft: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-7v-3m0 6h.01" stroke="#B0B0D0" strokeWidth="2" strokeLinecap="round"/></svg>
        Help
      </div>
      <div style={{ color: '#B0B0D0', opacity: 1, fontSize: 16, marginBottom: 32, width: '100%', paddingLeft: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#B0B0D0" strokeWidth="2" fill="none" /><path d="M10 13a3 3 0 100-6 3 3 0 000 6z" stroke="#B0B0D0" strokeWidth="2" /></svg>
        Settings
      </div>
    </aside>
  );
};

export default Sidebar; 