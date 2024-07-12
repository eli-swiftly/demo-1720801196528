import React from 'react';
import { Search, User } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="bg-background-primary p-medium flex justify-between items-center">
      <div className="flex items-center bg-background-primary rounded-full border px-medium py-small">
        <Search size={20} className="text-text-secondary mr-small" />
        <input 
          type="text" 
          placeholder="Search clients..." 
          className="bg-transparent text-text-primary outline-none"
        />
      </div>
      <div className="flex-1 text-center">
        <span className="text-text-primary text-large">Synca</span>
      </div>
      <div className="flex items-center">
        <span className="text-text-secondary mr-medium">Hello, Eli</span>
        <User size={24} className="text-text-secondary" />
      </div>
    </header>
  );
};

export default TopBar;