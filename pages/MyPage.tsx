
import React from 'react';
import { UserProfileCard } from '../components/UserProfileCard';
import { PostCard } from '../components/PostCard';
import { styles, primaryBlue, textPrimary, textSecondary } from '../styles';
import { dummyUsers, initialPosts } from '../data';

type MyPageProps = {
    onShowFollowing?: () => void;
    onShowPrivacy?: () => void;
    onLogout?: () => void;
    privacySettings?: any;
};

export const MyPage: React.FC<MyPageProps> = ({ onShowFollowing, onShowPrivacy, onLogout, privacySettings }) => {
    const user = { ...dummyUsers['user_main'], privacySettings };
    const userPosts = initialPosts.filter(post => post.authorId === user.id);

    return (
        <main style={styles.main}>
            <header style={{textAlign: 'center', marginBottom: '2rem', padding: '1rem', position: 'relative'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: '800', margin: 0}}>マイページ</h2>
                {onLogout && (
                    <button 
                        onClick={onLogout}
                        style={{
                            position: 'absolute', right: '1rem', top: '1rem',
                            border: 'none', background: 'none', color: textSecondary, fontWeight: '700', fontSize: '0.85rem'
                        }}
                    >
                        ログアウト
                    </button>
                )}
            </header>
            
            <UserProfileCard user={user} isMe={true} />
            
            <section style={{marginTop: '2.5rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0 1rem'}}>
                    <button style={{...styles.listItem, justifyContent: 'space-between', width: '100%', margin: 0}} onClick={onShowFollowing}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <div style={{color: primaryBlue}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg></div>
                            <span style={{fontWeight: '700', fontSize: '1rem', color: textPrimary}}>フォロー・フォロワー</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>

                    <button style={{...styles.listItem, justifyContent: 'space-between', width: '100%', margin: 0}} onClick={onShowPrivacy}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <div style={{color: '#10B981'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                            <span style={{fontWeight: '700', fontSize: '1rem', color: textPrimary}}>プライバシーとセキュリティ</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                            <span style={{fontSize: '0.75rem', color: '#10B981', fontWeight: '800'}}>保護中</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                        </div>
                    </button>

                    <button style={{...styles.listItem, justifyContent: 'space-between', width: '100%', margin: 0}} onClick={() => alert('開発中')}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <div style={{color: '#94A3B8'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
                            <span style={{fontWeight: '700', fontSize: '1rem', color: textPrimary}}>アカウント設定</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </section>

            <section style={{marginTop: '3rem'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem', color: textPrimary, padding: '0 1rem'}}>あなたのトーク</h3>
                <div style={styles.postList}>
                    {userPosts.map(post => <PostCard key={post.id} post={post} />)}
                </div>
            </section>
        </main>
    );
};
