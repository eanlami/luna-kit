import React from "react";
import './OrButton.scss';
import '../../base/type-style.scss';

interface OrButtonProps { 
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'error';
    appearance?: 'fill' | 'outline' | 'ghost';
    icon?: React.ReactNode;
    size?: 'xs' |'sm' |'md' | 'lg' | 'xl';
    className?: string; 
    layout?: 'icon' | 'text' | 'icon-text';
    fillBlock?: boolean;

}

const OrButton: React.FC<OrButtonProps> = ({ 
        text,
        onClick,
        disabled = false,
        variant = 'primary',
        appearance = 'fill',
        icon,
        size = 'md',
        className,
        layout = 'text',
        fillBlock=false,


    }) => { 
        
    const buttonClassName = `button ${layout} ${variant} ${appearance} ${size} ${fillBlock? 'fill-block' : ''} ${size === 'xs' ? 'c1' : 'b1'}`;

    return (
        <button 
            className={buttonClassName} 
            onClick={onClick} 
            disabled={disabled}
            >
                <div className="div-button">
                {icon  && <span className='icon'>{icon}</span>}
                {text}
                </div>
            </button>
    );
};

export default OrButton;