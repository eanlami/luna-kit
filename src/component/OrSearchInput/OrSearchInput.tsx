import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import './OrSearchInput.scss';
import SearchIcon from '../../assets/icons/search.svg';
import axios from 'axios';

interface OrSearchInputProps {
    onClick?: () => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const OrSearchInput: React.FC<OrSearchInputProps> = ({ 
    onClick,
    onChange,
    placeholder = 'enter your text',
    disabled = false,
    size = 'md',
}) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]); // لیست پیشنهادات
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // ایندکس انتخاب‌شده
    const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]); // رفرنس برای هر پیشنهاد

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get('https://orbit-website.s3.ir-thr-at1.arvanstorage.ir/IconList.json');
                const jsonSuggestions = response.data;

                // استخراج تمام کلیدها و مقادیر
                const allSuggestions: string[] = [];
                Object.keys(jsonSuggestions).forEach(key => {
                    allSuggestions.push(key); // اضافه کردن کلید
                    allSuggestions.push(...jsonSuggestions[key]); // اضافه کردن مقادیر
                });

                // فرمت‌دهی به پیشنهادات
                const formattedSuggestions = allSuggestions.map(suggestion => {
                    // حذف اعداد آخر، جایگزینی خط فاصله با فاصله و بزرگ‌نویسی حرف اول
                    const formatted = suggestion
                        .replace(/-\d+$/, '') // حذف اعداد آخر
                        .replace(/-/g, ' ') // جایگزینی خط فاصله با فاصله
                        .replace(/\b\w/g, char => char.toUpperCase()); // بزرگ‌نویسی حرف اول

                    return formatted;
                });

                // حذف پیشنهادات تکراری
                const uniqueSuggestions = Array.from(new Set(formattedSuggestions));

                setSuggestions(uniqueSuggestions);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };

        fetchSuggestions();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.length > 0); // نمایش پیشنهادات اگر ورودی بیشتر از صفر باشد
        setSelectedIndex(null); // ریست کردن ایندکس انتخاب‌شده
        if (onChange) onChange(event); // به روز رسانی والد
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setShowSuggestions(false); // پنهان کردن پیشنهادات
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // جلوگیری از رفرش صفحه
            if (selectedIndex !== null) {
                setInputValue(suggestions[selectedIndex]);
            }
            setShowSuggestions(false); // پنهان کردن پیشنهادات
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex(prevIndex => {
                const nextIndex = (prevIndex === null || prevIndex === suggestions.length - 1) ? 0 : prevIndex + 1;
                // اسکرول کردن به سمت پیشنهاد انتخاب‌شده
                suggestionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return nextIndex;
            });
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex(prevIndex => {
                const prevIndexValue = (prevIndex === null || prevIndex === 0) ? suggestions.length - 1 : prevIndex - 1;
                // اسکرول کردن به سمت پیشنهاد انتخاب‌شده
                suggestionRefs.current[prevIndexValue]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                return prevIndexValue;
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // جلوگیری از رفرش صفحه
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <img className={`input-icon-${size}`} src={SearchIcon} alt="search icon" />
                <input
                    className={`b1 search-input ${size}`}
                    value={inputValue}
                    onClick={onClick}
                    onChange={handleInputChange} 
                    onKeyDown={handleKeyPress} // مدیریت فشار کلید
                    disabled={disabled}
                    placeholder={placeholder}
                />
            </form>
            {showSuggestions && (
                <div className="suggestion-list">
                    {suggestions
                        .filter(suggestion => 
                            suggestion.toLowerCase().includes(inputValue.toLowerCase())
                        ) // فیلتر کردن پیشنهادات بر اساس ورودی
                        .map((suggestion, index) => (
                            <div 
                                key={index} 
                                className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`} 
                                onClick={() => handleSuggestionClick(suggestion)} // مدیریت کلیک روی پیشنهاد
                                ref={el => suggestionRefs.current[index] = el} // رفرنس برای هر پیشنهاد
                            >
                                {suggestion}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default OrSearchInput;
