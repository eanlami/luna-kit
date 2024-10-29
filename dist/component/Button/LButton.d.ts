import React from "react";
import './LButton.scss';
import '../../base/type-style.scss';
interface LButtonProps {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'error';
    appearance?: 'fill' | 'outline' | 'ghost';
    icon?: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    layout?: 'icon' | 'text' | 'icon-text';
    fillBlock?: boolean;
}
declare const LButton: React.FC<LButtonProps>;
export default LButton;
