import React, { ChangeEvent, ReactNode }  from "react";
import './OrSubHeader.scss';
import OrButton from "../OrButton/OrButton";
import Icon from "../../assets/Icon";


interface OrSubHeaderProps {
    toggleFilter: () => void; 
    isFilterVisible: boolean; 
}

const OrSubHeader: React.FC<OrSubHeaderProps> = ({
    toggleFilter, 
    isFilterVisible 

}) => { 

    return (
        <div className="sub-header">
            <OrButton
            layout="icon-text"
            size="md"
            variant="secondary"
            appearance="outline"
            text="Filter"
            onClick={toggleFilter}
            icon={<Icon.tune/>}
            />
        </div>

    );
};

export default OrSubHeader;