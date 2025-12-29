
import React from 'react';
import { styles, primaryBlue, textSecondary, borderLight } from '../styles';

type UserProfileCardProps = {
    user: any;
    isMe?: boolean;
};

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, isMe = false }) => {
    // Determine visibility based on dummy settings for now
    const privacy = user.privacySettings || { showUniversity: true, showRealName: true };

    const handleShare = async () => {
        const shareData = {
            title: `${user.name}のプロフィール | LETS`,
            text: `${user.university}の${user.name}です。LETSで繋がりましょう！`,
            url: window.location.href,
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Share failed:", err);
            }
        } else {
            alert('プロフィールリンクをコピーしました！');
        }
    };

    return (
        <div style={{ ...styles.businessCard, position: 'relative' }}>
            {isMe && (
                <div style={{ 
                    position: 'absolute', top: '1rem', right: '1rem', 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981',
                    padding: '4px 10px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: '900',
                    display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"></path></svg>
                    本人確認済
                </div>
            )}
            
            <div style={styles.cardContentContainer}>
                <div style={{
                    ...styles.profileAvatar,
                    backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
                    border: isMe ? `3px solid ${primaryBlue}` : 'none'
                }} role="img" aria-label={`${user.name}のプロフィール写真`}></div>
                
                <h2 style={styles.userName}>
                    {privacy.showRealName ? user.name : "匿名ユーザー"}
                    {!privacy.showRealName && isMe && <span style={{ fontSize: '0.7rem', color: textSecondary, marginLeft: '8px' }}>(本名は非公開中)</span>}
                </h2>
                
                <p style={styles.userTitle}>{user.title || "学生"}</p>
                
                <div style={styles.userInfoSeparator}></div>

                <div style={{ marginBottom: '1.5rem' }}>
                    {privacy.showUniversity ? (
                        <>
                            <p style={styles.userUniversity}>{user.university}</p>
                            <p style={styles.userDepartment}>
                                {user.faculty && `${user.faculty} `}
                                {user.year && `${user.year}年`}
                            </p>
                        </>
                    ) : (
                        <div style={{ backgroundColor: '#F1F5F9', padding: '1rem', borderRadius: '16px', display: 'inline-block' }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: textSecondary, fontWeight: '700' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ verticalAlign: 'middle', marginRight: '6px' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                大学情報は非公開設定です
                            </p>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {user.interests?.map((i: string) => (
                        <span key={i} style={{ backgroundColor: `${primaryBlue}10`, color: primaryBlue, padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>#{i}</span>
                    ))}
                </div>
                
                {user.sns && (
                    <div style={styles.snsLinks}>
                        <a href="#" style={styles.snsIcon} aria-label="Instagram"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" style={styles.snsIcon} aria-label="X"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733-16z"></path><path d="M4 20l6.768-6.768m2.46-2.46L20 4"></path></svg></a>
                    </div>
                )}
            </div>
            
            <div style={styles.qrSection}>
                <div style={{ ...styles.qrCode, opacity: privacy.profilePublic ? 0.7 : 0.2 }} role="img" aria-label="QRコード">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><path d="M14 14h2v2h-2zM19 14h2v2h-2zM14 19h2v2h-2zM19 19h2v2h-2z"></path></svg>
                </div>
                {privacy.profilePublic ? (
                    <button style={styles.shareButton} onClick={handleShare}>プロフィールを共有</button>
                ) : (
                    <p style={{ margin: 0, fontSize: '0.8rem', color: textSecondary, fontWeight: '700' }}>プライベートモードのため共有不可</p>
                )}
            </div>
        </div>
    );
};
