import React from 'react';
import './OrSwitch.scss';
interface OrSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}
declare const OrSwitch: React.FC<OrSwitchProps>;
export default OrSwitch;
