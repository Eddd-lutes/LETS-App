import React from 'react';
import { styles } from '../styles';

export const Header = () => (
    <header style={styles.header}>
        <h1 style={styles.logo}>CampusConnect</h1>
        <div style={styles.headerAvatar} aria-label="マイプロフィール">
            CC
        </div>
    </header>
);
