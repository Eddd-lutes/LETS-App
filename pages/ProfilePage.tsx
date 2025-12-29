import React from 'react';
import { UserProfileCard } from '../components/UserProfileCard';
import { PostCard } from '../components/PostCard';
import { styles, primaryBlue } from '../styles';
import { dummyUsers, initialPosts } from '../data';

type ProfilePageProps = {
    userId: string;
    onBack: () => void;
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ userId, onBack }) => {
    const user = dummyUsers[userId];
    const userPosts = initialPosts.filter(post => post.authorId === userId);

    if (!user) {
        return <div style={{padding: '2rem', textAlign: 'center'}}>ユーザーが見つかりません。</div>;
    }

    return (
        <main style={styles.profilePage}>
            <header style={styles.profileHeader}>
                 <button onClick={onBack} style={styles.backButton} aria-label="戻る">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <h2 style={styles.profileTitle}>{user.name}</h2>
                <div style={{width: '40px'}}></div>
            </header>
            <UserProfileCard user={user} />
            <section style={{marginTop: '3rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '900', marginBottom: '1.25rem', color: primaryBlue}}>投稿一覧</h3>
                <div style={styles.postList}>
                    {userPosts.length > 0 ? (
                        userPosts.map(post => <PostCard key={post.id} post={post} />)
                    ) : (
                        <p style={{color: '#94A3B8', textAlign: 'center', padding: '2rem'}}>このユーザーの投稿はまだありません。</p>
                    )}
                </div>
            </section>
        </main>
    );
};
