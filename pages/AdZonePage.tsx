
import React, { useState, useMemo } from 'react';
import { styles, primaryBlue, primaryPink, borderLight, textPrimary, textSecondary } from '../styles';
import { dummyFeaturedCompanies, dummyUsers } from '../data';

type AdZonePageProps = {
    followedCompanyIds: string[];
    onToggleFollow: (id: string) => void;
    onViewProfile?: (userId: string) => void;
    onViewCompany?: (companyId: string) => void;
};

// 詳細検索用のタグ
const STUDENT_INTERESTS = ['IT', '製造', '金融', '教育', 'メーカー', '営業', 'クリエイティブ'];
const STUDENT_ORIENTATIONS = ['地元就職', '安定', '挑戦', '技術職', '成長環境'];
const COMPANY_INDUSTRIES = ['機械・製造', '金融・銀行', 'IT・医療', '建設・インフラ', 'メディア', 'クリエイティブ'];

export const AdZonePage: React.FC<AdZonePageProps> = ({ 
    followedCompanyIds, 
    onToggleFollow,
    onViewProfile,
    onViewCompany
}) => {
    const [mode, setMode] = useState<'companies' | 'people'>('companies');
    const [followedUserIds, setFollowedUserIds] = useState<string[]>([]);
    
    // 検索状態
    const [q1, setQ1] = useState(''); // 大学名 / 業種
    const [q2, setQ2] = useState(''); // 興味 / キーワード
    const [orientFilter, setOrientFilter] = useState(''); // 志向性フィルター

    const toggleFollowUser = (userId: string) => {
        setFollowedUserIds(prev => 
            prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
        );
    };

    const filteredUsers = useMemo(() => {
        const allUsers = Object.values(dummyUsers).filter(u => u.id !== 'user_main');
        return allUsers.filter(user => {
            const matchesUniv = user.university?.toLowerCase().includes(q1.toLowerCase()) || 
                               user.faculty?.toLowerCase().includes(q1.toLowerCase());
            const matchesInterest = !q2 || 
                                   user.interests?.some((i: string) => i.toLowerCase().includes(q2.toLowerCase())) ||
                                   user.hobbies?.some((h: string) => h.toLowerCase().includes(q2.toLowerCase()));
            const matchesOrient = !orientFilter || user.orientation === orientFilter;
            return matchesUniv && matchesInterest && matchesOrient;
        });
    }, [q1, q2, orientFilter]);

    const filteredCompanies = useMemo(() => {
        return dummyFeaturedCompanies.filter(c => {
            const matchesIndustry = c.industry.toLowerCase().includes(q1.toLowerCase());
            const matchesQuery = c.name.toLowerCase().includes(q2.toLowerCase()) || 
                               c.location.toLowerCase().includes(q2.toLowerCase());
            return matchesIndustry && matchesQuery;
        });
    }, [q1, q2]);

    const renderHeader = () => (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: '1rem 1.25rem 0 1.25rem',
            background: '#FFFFFF',
            borderBottom: `1px solid ${borderLight}`
        }}>
            <div style={{
                display: 'flex',
                backgroundColor: '#F1F5F9',
                borderRadius: '20px',
                padding: '4px',
            }}>
                {(['companies', 'people'] as const).map((m) => {
                    const label = m === 'companies' ? '企業を探す' : '学生を探す';
                    const isActive = mode === m;
                    return (
                        <button 
                            key={m}
                            onClick={() => {
                                setMode(m);
                                setQ1('');
                                setQ2('');
                                setOrientFilter('');
                            }}
                            style={{
                                flex: 1,
                                padding: '0.8rem 0',
                                borderRadius: '16px',
                                border: 'none',
                                fontSize: '0.95rem',
                                fontWeight: '900',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                background: isActive ? '#FFFFFF' : 'transparent',
                                color: isActive ? primaryBlue : textSecondary,
                                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                            }}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const renderSearchPanel = () => {
        const isPeople = mode === 'people';
        return (
            <div style={{ 
                backgroundColor: '#fff', 
                padding: '1.5rem', 
                borderRadius: '32px',
                border: `1.5px solid ${borderLight}`,
                boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: primaryBlue }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder={isPeople ? "大学名・学部で検索..." : "業種・エリアで検索..."} 
                        value={q1}
                        onChange={(e) => setQ1(e.target.value)}
                        style={{ width: '100%', padding: '1.1rem 1rem 1.1rem 3.5rem', borderRadius: '18px', border: `1.5px solid ${borderLight}`, fontSize: '1rem', outline: 'none' }}
                    />
                </div>
                
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: primaryPink }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder={isPeople ? "興味・趣味で検索 (IT, 製造など)..." : "社名・キーワード検索..."} 
                        value={q2}
                        onChange={(e) => setQ2(e.target.value)}
                        style={{ width: '100%', padding: '1.1rem 1rem 1.1rem 3.5rem', borderRadius: '18px', border: `1.5px solid ${borderLight}`, fontSize: '1rem', outline: 'none' }}
                    />
                </div>

                {isPeople && (
                    <div>
                        <p style={{ fontSize: '0.8rem', color: textSecondary, fontWeight: '800', marginBottom: '0.75rem' }}>志向性で絞り込む</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {STUDENT_ORIENTATIONS.map(orient => (
                                <button 
                                    key={orient}
                                    onClick={() => setOrientFilter(orient === orientFilter ? '' : orient)}
                                    style={{
                                        padding: '0.5rem 1rem', borderRadius: '12px', border: 'none',
                                        backgroundColor: orientFilter === orient ? primaryPink : '#F1F5F9',
                                        color: orientFilter === orient ? '#fff' : textPrimary,
                                        fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer'
                                    }}
                                >
                                    {orient}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <p style={{ fontSize: '0.8rem', color: textSecondary, fontWeight: '800', marginBottom: '0.75rem' }}>人気のタグ</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {(isPeople ? STUDENT_INTERESTS : COMPANY_INDUSTRIES).map(tag => (
                            <button 
                                key={tag}
                                onClick={() => setQ2(tag)}
                                style={{
                                    padding: '0.5rem 1rem', borderRadius: '12px', border: 'none',
                                    backgroundColor: q2 === tag ? primaryBlue : '#F8FAFC',
                                    color: q2 === tag ? '#fff' : textPrimary,
                                    fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer'
                                }}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ ...styles.appContainer, backgroundColor: '#F8FAFC' }}>
            {renderHeader()}
            <main style={{ padding: '7rem 1.25rem 120px 1.25rem' }}>
                {renderSearchPanel()}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: textPrimary }}>
                        {mode === 'people' ? 'おすすめの学生' : '注目の企業'}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: primaryBlue, fontWeight: '800', backgroundColor: '#EFF6FF', padding: '4px 12px', borderRadius: '10px' }}>
                        {mode === 'people' ? filteredUsers.length : filteredCompanies.length} Hit
                    </span>
                </div>

                {mode === 'people' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        {filteredUsers.map(user => (
                            <div 
                                key={user.id} 
                                style={{ backgroundColor: '#fff', borderRadius: '28px', padding: '1.25rem', textAlign: 'center', border: `1.5px solid ${borderLight}`, boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
                                onClick={() => onViewProfile && onViewProfile(user.id)}
                            >
                                <div style={{ width: '64px', height: '64px', borderRadius: '24px', backgroundColor: '#F1F5F9', backgroundImage: `url(${user.avatar})`, backgroundSize: 'cover', margin: '0 auto 1rem', border: `2px solid #fff`, boxShadow: '0 6px 12px rgba(0,0,0,0.05)' }}></div>
                                <h4 style={{ fontSize: '1rem', fontWeight: '900', margin: '0 0 4px 0', color: textPrimary }}>{user.name}</h4>
                                <p style={{ fontSize: '0.75rem', color: primaryBlue, fontWeight: '800', margin: '0 0 2px 0' }}>{user.university}</p>
                                <p style={{ fontSize: '0.7rem', color: textSecondary, margin: '0 0 1rem 0' }}>{user.faculty} {user.year}</p>
                                
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.65rem', backgroundColor: '#F1F5F9', color: textSecondary, padding: '2px 6px', borderRadius: '6px', fontWeight: '700' }}>#{user.orientation}</span>
                                </div>

                                <button 
                                    onClick={(e) => { e.stopPropagation(); toggleFollowUser(user.id); }}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '12px', border: 'none', backgroundColor: followedUserIds.includes(user.id) ? '#F1F5F9' : primaryBlue, color: followedUserIds.includes(user.id) ? textSecondary : '#FFFFFF', fontSize: '0.8rem', fontWeight: '900' }}
                                >
                                    {followedUserIds.includes(user.id) ? 'フォロー中' : 'つながる'}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {filteredCompanies.map(company => (
                            <div 
                                key={company.id} 
                                style={{ backgroundColor: '#fff', borderRadius: '28px', overflow: 'hidden', border: `1.5px solid ${borderLight}`, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}
                                onClick={() => onViewCompany && onViewCompany(company.id)}
                            >
                                <div style={{ height: '110px', position: 'relative' }}>
                                    <img src={company.bgImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={company.name} />
                                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', background: 'rgba(59, 130, 246, 0.95)', color: '#fff', padding: '4px 14px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '900', backdropFilter: 'blur(10px)' }}>{company.industry}</div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '900', margin: 0 }}>{company.name}</h4>
                                            <p style={{ fontSize: '0.85rem', color: textSecondary, margin: '4px 0 0' }}>{company.location}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '1rem', fontWeight: '900', color: primaryPink }}>{company.salary}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '0.8rem 1.2rem', borderRadius: '16px' }}>
                                        <div>
                                            <p style={{ fontSize: '0.8rem', fontWeight: '800', color: textPrimary, margin: 0 }}>{company.internTitle}</p>
                                            <p style={{ fontSize: '0.7rem', color: textSecondary, margin: '2px 0 0' }}>休日: {company.holidays}</p>
                                        </div>
                                        <div style={{ color: primaryBlue }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
