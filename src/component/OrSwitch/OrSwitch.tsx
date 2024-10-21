import React from 'react';
import './OrSwitch.scss';

interface OrSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const OrSwitch: React.FC<OrSwitchProps> = ({ checked, onChange }) => {
    return (
        <div className="or-switch">
            <span className='b1-strong'> Fill </span>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="slider-switch"></span>
            </label>
        </div>
    );
};

export default OrSwitch;
