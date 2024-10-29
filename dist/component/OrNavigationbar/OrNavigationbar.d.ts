import React from 'react';
import "./OrNavigationbar.scss";
interface OrSidebarProps {
    setActivePage: (page: string) => void;
    activePage: string;
    handleMenuToggle: () => void;
}
declare const OrSidebar: React.FC<OrSidebarProps>;
export default OrSidebar;
