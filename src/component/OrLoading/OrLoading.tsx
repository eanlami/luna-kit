// Loading.tsx
import React from 'react';
import './OrLoading.scss';

const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">Loading...</div>
    </div>
  );
};

export default Loading;
