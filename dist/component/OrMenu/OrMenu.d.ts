import * as React from 'react';
import './OrMenu.scss';
interface OrMenu {
    itemMenu: {
        name: string;
        link: string;
        icon: React.ReactNode;
    }[];
    isOpen?: boolean;
    handleToggle?: () => void;
}
declare const OrMenu: React.FunctionComponent<OrMenu>;
export default OrMenu;
