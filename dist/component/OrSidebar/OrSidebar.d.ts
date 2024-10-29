import React from 'react';
import "./OrSidebar.scss";
interface OrSidebarProps {
    setActivePage: (page: string) => void;
    activePage: string;
}
declare const OrSidebar: React.FC<OrSidebarProps>;
export default OrSidebar;
