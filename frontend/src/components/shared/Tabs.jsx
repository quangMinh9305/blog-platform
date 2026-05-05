import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`border-b border-surface-variant flex overflow-x-auto hide-scrollbar ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`font-nav-display text-nav-display px-4 py-3 border-b-2 whitespace-nowrap transition-colors flex-shrink-0 ${
            activeTab === tab.id
              ? 'text-primary-container border-primary-container'
              : 'text-on-surface-variant hover:text-primary-container border-transparent'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1 opacity-75">({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;