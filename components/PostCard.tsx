import React from 'react';
import { styles } from '../styles';
import { dummyUsers as usersData } from '../data';

type PostCardProps = {
    post: any;
    onToggleFollow?: () => void;
    isFollowed?: boolean;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const author = usersData[post.authorId];
    
    return (
        <article style={styles.card}>
            <div style={styles.cardHeader}>
                <div 
                    style={{
                        ...styles.avatar, 
                        backgroundImage: author?.avatar ? `url(${author.avatar})` : 'none'
                    }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={styles.authorName}>{post.author}</div>
                    <div style={styles.timestamp}>{post.timestamp}</div>
                </div>
            </div>
            
            <p style={styles.cardContent}>{post.content}</p>
            
            {post.tags && (
                <div style={styles.tagContainer}>
                    {post.tags.map((tag: string) => (
                        <span key={tag} style={styles.tag}>{tag}</span>
                    ))}
                </div>
            )}
            
            <div style={styles.cardFooter}>
                <div style={styles.footerAction}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{post.likes}</span>
                </div>
                <div style={styles.footerAction}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
                    </svg>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{post.comments}</span>
                </div>
                <div style={{ ...styles.footerAction, marginLeft: 'auto' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                </div>
            </div>
        </article>
    );
};
