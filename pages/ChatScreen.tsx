import React, { useState, useEffect, useRef } from 'react';
import { styles } from '../styles';

type ChatScreenProps = {
    conversation: any;
    onBack: () => void;
    chatHistory: any[];
    onSendMessage: (chatId: number, messageText: string) => void;
};

export const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, onBack, chatHistory, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [chatHistory]);

    const handleSendMessageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        
        onSendMessage(conversation.id, newMessage);
        setNewMessage('');
    };

    return (
        <div style={styles.chatScreen}>
            <header style={styles.chatScreenHeader}>
                <button onClick={onBack} style={styles.backButton} aria-label="戻る">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <h2 style={styles.chatPartnerName}>{conversation.name}</h2>
                <div style={{ width: '40px' }}></div> {/* Spacer */}
            </header>
            <main style={styles.messageList}>
                {chatHistory.map(msg => (
                    <div key={msg.id} style={msg.sender === 'me' ? styles.myMessage : styles.theirMessage}>
                        <p style={styles.messageText}>{msg.text}</p>
                        <span style={msg.sender === 'me' ? styles.messageTimestamp : styles.theirMessageTimestamp}>{msg.timestamp}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>
            <footer style={styles.messageInputForm}>
                <form onSubmit={handleSendMessageSubmit} style={{ display: 'flex', width: '100%' }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="メッセージを入力..."
                        style={styles.messageInput}
                        aria-label="メッセージ入力"
                    />
                    <button type="submit" style={styles.sendButton} aria-label="送信">送信</button>
                </form>
            </footer>
        </div>
    );
};