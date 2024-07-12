import React from 'react';
import { Home, BarChart4, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, setActiveScreen }) => {
  const iconClass = "w-6 h-6 text-text-secondary cursor-pointer transition-colors duration-300";
  const activeIconClass = "text-accent-primary";

  return (
    <aside className="w-16 bg-background-secondary flex flex-col items-center py-6">
      <div className="mb-8" onClick={() => setActiveScreen('home')}>
        <Home className={`${iconClass} ${activeScreen === 'home' && activeIconClass}`} />
      </div>
      <div className="mb-8" onClick={() => setActiveScreen('analytics')}>
        <BarChart4 className={`${iconClass} ${activeScreen === 'analytics' && activeIconClass}`} />
      </div>
      <div className="mb-8" onClick={() => setActiveScreen('templates')}>
        <FileText className={`${iconClass} ${activeScreen === 'templates' && activeIconClass}`} />
      </div>
      <div>
        <Settings className={iconClass} />
      </div>
    </aside>
  );
};

export default Sidebar;