
import React, { useState } from 'react';
import { CampusWall } from './pages/CampusWall';
import { BusinessCardPage } from './pages/BusinessCardPage';
import { AdZonePage } from './pages/AdZonePage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { ChatScreen } from './pages/ChatScreen';
import { MyPage } from './pages/MyPage';
import { FollowingPage } from './pages/FollowingPage';
import { CompanyDetailPage } from './pages/CompanyDetailPage';
import { AuthPage } from './pages/AuthPage';
import { CompanyDashboard } from './pages/CompanyDashboard';
import { PrivacySettingsPage } from './pages/PrivacySettingsPage';
import { BottomNavBar } from './components/BottomNavBar';
import { styles } from './styles';
import { 
    dummyUsers, 
    initialPosts, 
    initialConversations, 
    initialCompanyConversations,
    initialChatHistories 
} from './data';

export const App = () => {
    const [userRole, setUserRole] = useState<'student' | 'company' | null>(null);
    const [activePage, setActivePage] = useState('home');
    const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
    const [viewingCompanyId, setViewingCompanyId] = useState<string | null>(null);
    const [activeChat, setActiveChat] = useState<any | null>(null);
    const [isViewingFollowing, setIsViewingFollowing] = useState(false);
    const [isViewingPrivacy, setIsViewingPrivacy] = useState(false);
    
    // Data state
    const [posts, setPosts] = useState(initialPosts);
    const [conversations, setConversations] = useState(initialConversations);
    const [companyConversations, setCompanyConversations] = useState(initialCompanyConversations);
    const [chatHistories, setChatHistories] = useState(initialChatHistories);
    const [followedCompanyIds, setFollowedCompanyIds] = useState<string[]>(['c1']);

    // Privacy settings state
    const [privacySettings, setPrivacySettings] = useState({
        profilePublic: true,
        showUniversity: true,
        allowCompanyScout: true,
        showRealName: true
    });

    const handleLogin = (role: 'student' | 'company') => {
        setUserRole(role);
        setActivePage('home');
    };

    const handleLogout = () => {
        setUserRole(null);
        setViewingProfileId(null);
        setViewingCompanyId(null);
        setActiveChat(null);
        setIsViewingFollowing(false);
        setIsViewingPrivacy(false);
    };

    const handleBack = () => {
        setViewingProfileId(null);
        setViewingCompanyId(null);
        setActiveChat(null);
        setIsViewingFollowing(false);
        setIsViewingPrivacy(false);
    };

    const handleOpenChat = (conversation: any) => {
        const updatedConversations = (userRole === 'company' ? companyConversations : conversations).map(c => 
            c.id === conversation.id ? { ...c, unread: false } : c
        );
        if (userRole === 'company') setCompanyConversations(updatedConversations);
        else setConversations(updatedConversations);
        
        setActiveChat(conversation);
    };

    if (!userRole) {
        return <AuthPage onLogin={handleLogin} />;
    }

    const renderPage = () => {
        if (userRole === 'company') {
            if (activeChat) return <ChatScreen conversation={activeChat} onBack={handleBack} chatHistory={chatHistories[activeChat.id] || []} onSendMessage={() => {}} />;
            if (viewingProfileId) return <ProfilePage userId={viewingProfileId} onBack={handleBack} />;
            switch (activePage) {
                case 'home': return <CompanyDashboard onLogout={handleLogout} onOpenChat={handleOpenChat} onViewStudent={(id) => setViewingProfileId(id)} />;
                case 'messages': return <MessagesPage conversations={conversations} companyConversations={companyConversations} onViewProfile={(id) => setViewingProfileId(id)} onOpenChat={handleOpenChat} />;
                default: return <CompanyDashboard onLogout={handleLogout} onOpenChat={handleOpenChat} onViewStudent={(id) => setViewingProfileId(id)} />;
            }
        }

        if (isViewingPrivacy) return <PrivacySettingsPage settings={privacySettings} setSettings={setPrivacySettings} onBack={handleBack} />;
        if (viewingProfileId) return <ProfilePage userId={viewingProfileId} onBack={handleBack} />;
        if (viewingCompanyId) return <CompanyDetailPage companyId={viewingCompanyId} onBack={handleBack} isFollowed={followedCompanyIds.includes(viewingCompanyId)} onToggleFollow={() => {}} />;
        if (isViewingFollowing) return <FollowingPage onBack={handleBack} onViewProfile={(id) => setViewingProfileId(id)} followedCompanyIds={followedCompanyIds} onToggleFollowCompany={() => {}} />;
        if (activeChat) return <ChatScreen conversation={activeChat} onBack={handleBack} chatHistory={chatHistories[activeChat.id] || []} onSendMessage={() => {}} />;
        
        switch (activePage) {
            case 'home': return <CampusWall posts={posts} onAddNewPost={() => {}} followedCompanyIds={followedCompanyIds} onToggleFollowCompany={() => {}} />;
            case 'card': return <BusinessCardPage />;
            case 'ads': return <AdZonePage followedCompanyIds={followedCompanyIds} onToggleFollow={() => {}} onViewProfile={(id) => setViewingProfileId(id)} onViewCompany={(id) => setViewingCompanyId(id)} />;
            case 'messages': return <MessagesPage conversations={conversations} companyConversations={companyConversations} onViewProfile={(id) => setViewingProfileId(id)} onOpenChat={handleOpenChat} />;
            case 'mypage': return <MyPage onShowFollowing={() => setIsViewingFollowing(true)} onShowPrivacy={() => setIsViewingPrivacy(true)} onLogout={handleLogout} privacySettings={privacySettings} />;
            default: return <CampusWall posts={posts} onAddNewPost={() => {}} followedCompanyIds={followedCompanyIds} onToggleFollowCompany={() => {}} />;
        }
    };

    return (
        <div style={styles.appContainer}>
            {renderPage()}
            {!viewingProfileId && !viewingCompanyId && !activeChat && !isViewingFollowing && !isViewingPrivacy &&
                <BottomNavBar activePage={activePage} setActivePage={setActivePage} isCompany={userRole === 'company'} />
            }
        </div>
    );
};
