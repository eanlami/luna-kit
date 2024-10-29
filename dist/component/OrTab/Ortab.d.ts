import React from 'react';
import './OrTab.scss';
interface OrTabProps {
    tabs: string[];
    onTabChange: (tab: string) => void;
    isSegmentControl?: boolean;
    initialTab: string;
}
declare const OrTab: React.FC<OrTabProps>;
export default OrTab;
