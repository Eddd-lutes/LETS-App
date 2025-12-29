
import React from 'react';
import { styles, primaryBlue, primaryPink, borderLight, textPrimary, textSecondary } from '../styles';
import { dummyFeaturedCompanies } from '../data';

type CompanyDetailPageProps = {
    companyId: string;
    onBack: () => void;
    isFollowed: boolean;
    onToggleFollow: (id: string) => void;
};

export const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({ 
    companyId, 
    onBack, 
    isFollowed, 
    onToggleFollow 
}) => {
    const company = dummyFeaturedCompanies.find(c => c.id === companyId);

    if (!company) return <div style={{ padding: '2rem', textAlign: 'center' }}>企業が見つかりません。</div>;

    return (
        <div style={{ ...styles.appContainer, backgroundColor: '#FFFFFF' }}>
            {/* Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${borderLight}`
            }}>
                <button onClick={onBack} style={{ ...styles.backButton, background: '#F1F5F9', borderRadius: '12px', padding: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <h2 style={{ fontSize: '1rem', fontWeight: '900', margin: 0 }}>企業詳細</h2>
                <div style={{ width: '40px' }}></div>
            </header>

            <main style={{ paddingBottom: '100px' }}>
                {/* Hero Image */}
                <div style={{ width: '100%', height: '250px', position: 'relative', marginTop: '60px' }}>
                    <img src={company.bgImage} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-40px',
                        left: '1.5rem',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        background: `linear-gradient(135deg, ${primaryBlue}, #1d4ed8)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: '900',
                        color: '#fff',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        border: '4px solid #fff'
                    }}>
                        {company.logo}
                    </div>
                </div>

                {/* Company Info Section */}
                <div style={{ padding: '3.5rem 1.5rem 1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 0.25rem' }}>{company.name}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.85rem', color: primaryBlue, fontWeight: '800', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>{company.industry}</span>
                                <span style={{ fontSize: '0.9rem', color: textSecondary, fontWeight: '600' }}>{company.location}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => onToggleFollow(company.id)}
                            style={{
                                padding: '0.75rem 1.25rem',
                                borderRadius: '16px',
                                border: 'none',
                                backgroundColor: isFollowed ? '#F1F5F9' : primaryBlue,
                                color: isFollowed ? textSecondary : '#fff',
                                fontWeight: '900',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {isFollowed ? 'フォロー中' : 'フォロー'}
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '1rem', 
                        marginBottom: '2rem' 
                    }}>
                        <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '20px', border: `1px solid ${borderLight}` }}>
                            <div style={{ fontSize: '0.75rem', color: textSecondary, fontWeight: '800', marginBottom: '4px', textTransform: 'uppercase' }}>想定年収</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '900', color: textPrimary }}>{company.salary}</div>
                        </div>
                        <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '20px', border: `1px solid ${borderLight}` }}>
                            <div style={{ fontSize: '0.75rem', color: textSecondary, fontWeight: '800', marginBottom: '4px', textTransform: 'uppercase' }}>年間休日</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '900', color: textPrimary }}>{company.holidays}</div>
                        </div>
                    </div>

                    {/* Internship Content */}
                    <div style={{ 
                        backgroundColor: '#fff', 
                        borderRadius: '28px', 
                        padding: '1.5rem', 
                        border: `1.5px solid ${primaryPink}20`,
                        boxShadow: `0 10px 30px ${primaryPink}08`,
                        marginBottom: '2rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ width: '36px', height: '36px', backgroundColor: primaryPink, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '900', margin: 0, color: textPrimary }}>インターンシップ情報</h3>
                        </div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.75rem', color: primaryPink }}>{company.internTitle}</h4>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#475569', margin: 0 }}>{company.internContent}</p>
                    </div>

                    {/* About Section (Placeholder) */}
                    <section>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1rem' }}>企業について</h3>
                        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: textSecondary }}>
                            当社は{company.industry}業界のリーディングカンパニーとして、革新的なソリューションを提供しています。
                            学生の皆さんの新しい視点と熱意を歓迎します。チームの一員として、社会にインパクトを与える仕事を体験してみませんか。
                        </p>
                    </section>
                </div>
            </main>

            {/* Bottom Actions */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem 1.5rem 2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderTop: `1px solid ${borderLight}`,
                display: 'flex',
                gap: '1rem',
                zIndex: 100
            }}>
                <button 
                    style={{
                        flex: 1,
                        padding: '1.15rem',
                        borderRadius: '20px',
                        border: 'none',
                        background: `linear-gradient(135deg, ${primaryBlue}, #1d4ed8)`,
                        color: '#fff',
                        fontWeight: '900',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: `0 8px 25px ${primaryBlue}44`
                    }}
                    onClick={() => alert('エントリーを受け付けました。')}
                >
                    インターンにエントリー
                </button>
                <button 
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '20px',
                        border: `2px solid ${borderLight}`,
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: textSecondary
                    }}
                    onClick={() => alert('チャット画面へ遷移します')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                </button>
            </div>
        </div>
    );
};
