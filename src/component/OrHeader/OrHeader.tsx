import React, { useEffect, useState, ChangeEvent, ReactNode } from "react";
import axios from 'axios';
import './OrHeader.scss';
import OrButton from "../OrButton/OrButton";
import OrSearchInput from "../OrSearchInput/OrSearchInput";
import Icon from '../../assets/Icon';
import Modal from '../OrDownloadModal/OrModal';

interface OrHeaderProps {
    children?: ReactNode;
    onSearch: (searchTerm: string) => void;
    toggleFilter: () => void; 
    isFilterVisible: boolean;
    switchModal?: () => void;
    isModalrVisible: boolean
    filterOpen: boolean;
}

const OrHeader: React.FC<OrHeaderProps> = ({ 
    children, 
    onSearch,
    toggleFilter, 
    isFilterVisible, 
    switchModal,
    isModalrVisible,
    filterOpen

}) => { 
    const [iconCount, setIconCount] = useState<number>(123);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true); // State for filter

    const fetchIconCount = async () => {
        try {
            const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?list-type=2');
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "application/xml");
            const keys = xmlDoc.getElementsByTagName("Key");
            const svgIcons = Array.from(keys).filter((key: Element) => {
                const filePath = key.textContent || '';
                return filePath.endsWith('.svg'); // Only SVG files
            });
            setIconCount(svgIcons.length);
        } catch (error) {
            console.error('Error fetching icon count:', error);
        }
    };

    const initialFilter = () => {

        switch (filterOpen) {
            case true:
                return (
                    <div>   
                    <div className="header-filter-action">
                    <OrButton 
                    layout="icon-text" 
                    variant='secondary' 
                    appearance="outline" 
                    size="lg" 
                    text="Filter"
                    icon={<Icon.cross/>}
                    onClick={toggleFilter} // Open modal on click
                    />
                    <OrButton 
                        layout="icon-text" 
                        variant='secondary' 
                        appearance="outline" 
                        size="lg" 
                        text="Download all"
                        icon={<Icon.download/>}
                        onClick={switchModal} // Open modal on click
                    />
                    </div>

                    <div className="mobile-actions">
                    <OrButton 
                    layout="icon-text" 
                    variant='secondary' 
                    appearance="outline" 
                    size="md" 
                    text="Filter"
                    icon={<Icon.cross/>}
                    onClick={toggleFilter} // Open modal on click
                    />
                    <OrButton 
                        layout="icon" 
                        variant='secondary' 
                        appearance="outline" 
                        size="md" 
                        icon={<Icon.download/>}
                        onClick={switchModal} // Open modal on click
                    />
                    </div>

                    </div>
                );
            case false:
                return (
                    <div>   
                        <div className="header-filter-action">
                        <OrButton 
                        layout="icon-text" 
                        variant='secondary' 
                        appearance="fill" 
                        size="lg" 
                        text="Filter"
                        icon={<Icon.tune/>}
                        onClick={toggleFilter} // Open modal on click
                         />
                         <OrButton 
                        layout="icon-text" 
                        variant='secondary' 
                        appearance="outline" 
                        size="lg" 
                        text="Download all"
                        icon={<Icon.download/>}
                        onClick={switchModal} // Open modal on click
                    />
                        </div>
                        
                        <div className="mobile-actions">
                        <OrButton 
                        layout="icon-text" 
                        variant='secondary' 
                        appearance="fill" 
                        size="md" 
                        text="Filter"
                        icon={<Icon.tune/>}
                        onClick={toggleFilter} // Open modal on click
                         />
                         <OrButton 
                        layout="icon" 
                        variant='secondary' 
                        appearance="outline" 
                        size="md" 
                        icon={<Icon.download/>}
                        onClick={switchModal} // Open modal on click
                    />
                        </div>
                        
                    </div>
                );
            default:
                return null;
        }

    };

    useEffect(() => {
        fetchIconCount();
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal open/close

    };
    
    const iconCountNumber = `Search on ${iconCount} icons ...`;

    return (
        <div className="main-header">
            <div className='desk-header'>
                <div className="logo">
                    <a href="#">
                        <svg width="125" height="34" viewBox="0 0 98 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M71.0033 5.52406C71.0033 2.84954 73.1447 0.681722 75.7866 0.681722C78.4286 0.681722 80.57 2.84954 80.57 5.52406C80.57 8.19858 78.4286 10.3664 75.7866 10.3664C73.1447 10.3664 71.0033 8.19858 71.0033 5.52406ZM80.57 27.7988V17.1457L76.7433 12.3033H71.0033V27.7988H80.57ZM97.79 12.3033V8.42947H94.92V4.47967L91.0933 0.69257L85.3533 0.680176V8.42792H82.4833V16.1757L85.3533 15.2072V20.3238C85.3533 20.3238 85.3533 27.7973 90.1366 27.7973H97.79V18.1126H94.92V13.0285L97.79 12.3018V12.3033ZM38.4766 6.49253V0.694121L33.6933 0.681722L28.91 4.55559V27.7988H38.4766V20.0511L44.2166 14.2403V4.55559H41.3283L38.4766 6.49253ZM26.9966 14.2403C26.9966 6.75286 20.9995 0.681722 13.6033 0.681722C6.20711 0.681722 0.209961 6.75286 0.209961 14.2403C0.209961 21.7277 6.20711 27.7988 13.6033 27.7988C20.9995 27.7988 26.9966 21.7277 26.9966 14.2403ZM57.6207 4.55559C57.1278 4.55559 56.6426 4.59123 56.1665 4.65166V0.681722H46.1407V16.1772C46.1407 22.5954 51.2807 27.7988 57.6207 27.7988C63.9607 27.7988 69.1007 22.5954 69.1007 16.1772C69.1007 9.75898 63.9607 4.55559 57.6207 4.55559Z" fill="#2B2B2B"/>
                        </svg>
                    </a>
                    <span className="c1">v1.0</span>
                </div>
                
                <div className="search-div">
                    <OrSearchInput onChange={handleSearchChange} placeholder={iconCountNumber} size="lg" />
                </div>
                {children && <div className="children-container">{children}</div>}
                <div className="header-action">
                    

                    {initialFilter()}

                </div>
                
            </div>
            <div className="search-div-mobile">
                <OrSearchInput onChange={handleSearchChange} placeholder={iconCountNumber} size="sm" />

                {/* {initialFilter()}
                <OrButton onClick={switchModal} layout="icon" variant='secondary' appearance="outline" size="md" icon={<Icon.download/>} /> */}
            </div>

            {/* Modal component */}
            
        </div>

    );
};

export default OrHeader;
