import * as React from 'react';
import './OrLogs.scss';
import '../../base/style.scss';
interface OrMenu {
    itemLogs: {
        date: string;
        version: string;
        changes: {
            text: string[];
            type: string;
        }[];
    }[];
}
declare const OrMenu: React.FunctionComponent<OrMenu>;
export default OrMenu;
