
import React, { useState } from 'react';
import { styles, primaryBlue, primaryPink, borderLight, textPrimary, textSecondary } from '../styles';

type AuthPageProps = {
    onLogin: (role: 'student' | 'company') => void;
};

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
    const [role, setRole] = useState<'student' | 'company'>('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const accentColor = role === 'student' ? primaryBlue : '#4F46E5';

    const handleLoginClick = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, validate here. For now, just login.
        onLogin(role);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
            background: `linear-gradient(135deg, ${accentColor}10 0%, #FFFFFF 100%)`,
        }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ ...styles.logo, fontSize: '3rem', marginBottom: '0.5rem' }}>LETS</h1>
                <p style={{ color: textSecondary, fontWeight: '700' }}>学生・企業・地域の「つながる」を加速させる</p>
            </div>

            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: '2rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                border: `1px solid ${borderLight}`,
                maxWidth: '400px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '16px',
                    padding: '4px',
                    marginBottom: '2rem'
                }}>
                    <button 
                        onClick={() => setRole('student')}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '12px', border: 'none',
                            backgroundColor: role === 'student' ? '#FFF' : 'transparent',
                            color: role === 'student' ? primaryBlue : textSecondary,
                            fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer',
                            boxShadow: role === 'student' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none'
                        }}
                    >
                        学生
                    </button>
                    <button 
                        onClick={() => setRole('company')}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '12px', border: 'none',
                            backgroundColor: role === 'company' ? '#FFF' : 'transparent',
                            color: role === 'company' ? '#4F46E5' : textSecondary,
                            fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer',
                            boxShadow: role === 'company' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none'
                        }}
                    >
                        企業
                    </button>
                </div>

                <form onSubmit={handleLoginClick} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.5rem', color: textSecondary }}>
                            {role === 'student' ? '学生ID / メールアドレス' : '企業ID / 採用担当メール'}
                        </label>
                        <input 
                            type="email" 
                            placeholder="example@lets.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '16px',
                                border: `1.5px solid ${borderLight}`, fontSize: '1rem', outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.5rem', color: textSecondary }}>
                            パスワード
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '16px',
                                border: `1.5px solid ${borderLight}`, fontSize: '1rem', outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        style={{
                            marginTop: '1rem', padding: '1.1rem', borderRadius: '16px', border: 'none',
                            backgroundColor: accentColor, color: '#FFFFFF', fontWeight: '900',
                            fontSize: '1rem', cursor: 'pointer', boxShadow: `0 10px 20px ${accentColor}33`
                        }}
                    >
                        ログインする
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <a href="#" style={{ fontSize: '0.85rem', color: textSecondary, textDecoration: 'none', fontWeight: '600' }}>新規アカウント作成はこちら</a>
                </div>
            </div>

            <footer style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', fontSize: '0.75rem', color: textSecondary }}>
                &copy; 2025 LETS. All Rights Reserved.
            </footer>
        </div>
    );
};
