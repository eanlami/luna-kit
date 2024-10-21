import React, { useState } from 'react';
import './OrTab.scss';

interface OrTabProps {
  tabs: string[]; 
  onTabChange: (tab: string) => void;
  isSegmentControl?: boolean; 
  initialTab: string;
}

const OrTab: React.FC<OrTabProps> = ({ tabs, onTabChange, isSegmentControl = true, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[1]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className={`b2 or-tab ${isSegmentControl ? 'segment-control' : 'tabs'}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`b2-strong tab-button ${activeTab === tab ? 'active' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default OrTab;
