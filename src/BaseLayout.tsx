import React, { ReactNode } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { theme } from './theme';

interface BaseLayoutProps {
  children: ReactNode;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, activeScreen, setActiveScreen }) => {
  return (
    <div style={{
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
      minHeight: '100vh',
      display: 'flex',
    }}>
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <div style={{ flex: 1 }}>
        <TopBar />
        <main style={{ padding: theme.spacing.large }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;