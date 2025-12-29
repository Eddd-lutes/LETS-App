
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';
import { NewPostModal } from '../components/NewPostModal';
import { styles, primaryBlue } from '../styles';

// Fix: Removed non-existent import 'dummyCompanyPosts' which was causing a compilation error.
// Also removed unused 'useMemo' import.

type CampusWallProps = {
    posts: any[];
    onAddNewPost: (post: { title: string; content: string; category: string; }) => void;
    followedCompanyIds: string[];
    onToggleFollowCompany: (id: string) => void;
};

export const CampusWall: React.FC<CampusWallProps> = ({ 
    posts, 
    onAddNewPost, 
    followedCompanyIds, 
    onToggleFollowCompany 
}) => {
    const [activeTab, setActiveTab] = useState('campus');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div style={styles.appContainer}>
            <Header />
            
            <nav style={styles.campusWallTabs}>
                <button 
                    style={activeTab === 'campus' ? {...styles.wallTab, ...styles.wallTabActive} : styles.wallTab}
                    onClick={() => setActiveTab('campus')}
                >
                    Campus Wall
                    {activeTab === 'campus' && <div style={styles.tabIndicator}></div>}
                </button>
                <button 
                    style={activeTab === 'national' ? {...styles.wallTab, ...styles.wallTabActive} : styles.wallTab}
                    onClick={() => setActiveTab('national')}
                >
                    全国トレンド
                    {activeTab === 'national' && <div style={styles.tabIndicator}></div>}
                </button>
            </nav>

            <main style={styles.main}>
                <div style={styles.boardSelector}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={primaryBlue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    早稲田大学のキャンパスボード
                </div>
                
                <div style={styles.postList}>
                    {posts.map(post => (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                        />
                    ))}
                </div>
            </main>

            <button style={styles.fab} aria-label="新規投稿" onClick={() => setIsModalOpen(true)}>+</button>
            {isModalOpen && <NewPostModal onClose={() => setIsModalOpen(false)} onSubmit={(data) => onAddNewPost({...data, category: ''})} />}
        </div>
    );
};
