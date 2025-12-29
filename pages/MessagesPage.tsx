
import React, { useState, useMemo } from 'react';
// Fix: Use primaryBlue instead of neonBlue which is not exported
import { styles, primaryBlue } from '../styles';

const ChatListItem: React.FC<{ conversation: any, onOpenChat: (conv: any) => void, onViewProfile: (userId: string) => void }> = ({ conversation, onOpenChat, onViewProfile }) => {
    const handleProfileClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onViewProfile(conversation.userId);
    };

    return (
        <div style={styles.listItem} onClick={() => onOpenChat(conversation)} role="button" tabIndex={0}>
            <div 
                style={{...styles.avatar, width: '56px', height: '56px', cursor: 'pointer'}} 
                onClick={handleProfileClick} 
                role="button" 
                aria-label={`${conversation.name}のプロフィールを表示`}
            ></div>
            <div style={styles.listInfo}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={styles.listTitle}>{conversation.name}</span>
                    <span style={{fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)'}}>{conversation.timestamp}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px'}}>
                    <p style={styles.listSubtitle}>{conversation.lastMessage}</p>
                    {conversation.unread && <div style={{width: '10px', height: '10px', borderRadius: '50%', background: primaryBlue, boxShadow: `0 0 8px ${primaryBlue}`}} aria-label="未読"></div>}
                </div>
            </div>
        </div>
    );
}

type MessagesPageProps = {
    conversations: any[];
    companyConversations: any[];
    onOpenChat: (conv: any) => void;
    onViewProfile: (userId: string) => void;
};

export const MessagesPage: React.FC<MessagesPageProps> = ({ conversations, companyConversations, onOpenChat, onViewProfile }) => {
    const [activeTab, setActiveTab] = useState('メイン');
    const [searchTerm, setSearchTerm] = useState('');
    
    const conversationsToShow = useMemo(() => {
        let currentList;
        switch (activeTab) {
            case '企業':
                currentList = companyConversations;
                break;
            case '一般':
                currentList = [];
                break;
            case 'メイン':
            default:
                currentList = conversations;
        }
        if (!searchTerm) return currentList;
        return currentList.filter(conv => conv.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [activeTab, conversations, companyConversations, searchTerm]);

    return (
        <main style={styles.messagesPage}>
            <header style={styles.messagesHeader}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                    <h2 style={styles.messagesTitle}>メッセージ</h2>
                    <button style={{...styles.button, background: 'rgba(255,255,255,0.05)', color: primaryBlue, padding: '0.5rem 1rem'}}>
                        リクエスト
                    </button>
                </div>
                <div style={styles.tabsContainer}>
                    {['メイン', '一般', '企業'].map(tab => (
                        <button 
                            key={tab} 
                            style={activeTab === tab ? {...styles.tab, ...styles.activeTab} : styles.tab}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>
            <div style={styles.searchBarContainer}>
                <input 
                    type="search" 
                    placeholder="名前やメッセージを検索..." 
                    style={styles.searchBar} 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div style={{padding: '0 1.5rem', flex: 1, overflowY: 'auto'}}>
                {conversationsToShow.map(conv => (
                    <ChatListItem key={conv.id} conversation={conv} onOpenChat={onOpenChat} onViewProfile={onViewProfile} />
                ))}
            </div>
        </main>
    );
};
