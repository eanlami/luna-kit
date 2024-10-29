import React from 'react';
import './OrSlider.scss';
interface OrSliderProps {
    value: number;
    onChange: (value: number) => void;
}
declare const OrSlider: React.FC<OrSliderProps>;
export default OrSlider;
