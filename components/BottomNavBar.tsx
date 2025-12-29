
import React from 'react';
import { styles, primaryBlue } from '../styles';

type BottomNavBarProps = {
    activePage: string;
    setActivePage: (page: string) => void;
    isCompany?: boolean;
};

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePage, setActivePage, isCompany = false }) => {
    const studentItems = [
        { id: 'home', label: 'ホーム', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
        { id: 'ads', label: '見つける', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg> },
        { id: 'messages', label: 'DM', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
        { id: 'mypage', label: 'マイページ', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> }
    ];

    const companyItems = [
        { id: 'home', label: 'ダッシュボード', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
        { id: 'messages', label: '学生とDM', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
        { id: 'ads', label: '学生検索', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> }
    ];

    const navItems = isCompany ? companyItems : studentItems;

    return (
        <nav style={styles.navBar}>
            {navItems.map(item => (
                <button
                    key={item.id}
                    style={styles.navItem}
                    onClick={() => setActivePage(item.id)}
                    aria-label={item.label}
                >
                    <div style={activePage === item.id ? styles.activeNavBox : { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ color: activePage === item.id ? (isCompany ? '#4F46E5' : primaryBlue) : '#94A3B8' }}>
                            {item.icon}
                        </div>
                        <span style={{ 
                            ...styles.navLabel, 
                            color: activePage === item.id ? (isCompany ? '#4F46E5' : primaryBlue) : '#94A3B8' 
                        }}>
                            {item.label}
                        </span>
                    </div>
                </button>
            ))}
        </nav>
    );
};
