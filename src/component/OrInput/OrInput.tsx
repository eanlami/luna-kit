import React, { useState } from 'react';
import tinycolor from 'tinycolor2'; // tinycolor2 برای مدیریت رنگ‌ها
import './OrInput.scss';
import OrButton from '../OrButton/OrButton';

interface OrInputProps {
  initialValue?: string;
  onColorChange?: (color: string) => void;
  label?: string;
  maxRecentColors?: number;
}

const OrInput: React.FC<OrInputProps> = ({ initialValue = '#ff0000', onColorChange, label, maxRecentColors = 3 }) => {
  const [color, setColor] = useState<string>(initialValue);
  const [inputValue, setInputValue] = useState<string>(initialValue); // برای نگه‌داری مقدار ورودی بدون اعتبارسنجی فوری
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // افزودن رنگ به لیست رنگ‌های اخیر
  const addRecentColor = (newColor: string) => {
    setRecentColors((prevColors) => {
      const updatedColors = prevColors.filter(c => c !== newColor);
      return [newColor, ...updatedColors].slice(0, maxRecentColors);
    });
  };

  // هندل کردن تغییرات در ورودی متنی بدون محدودیت تایپ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // به‌روزرسانی مقدار ورودی بدون محدودیت
  };

  // اعتبارسنجی رنگ هنگام خروج از ورودی (onBlur) یا فشردن Enter
  const validateAndApplyColor = () => {
    if (tinycolor(inputValue).isValid()) {
      const validColor = tinycolor(inputValue).toHexString(); // تبدیل رنگ به فرمت هگزادسیمال
      setColor(validColor); // تنظیم رنگ معتبر
      if (onColorChange) {
        onColorChange(validColor);
      }
      addRecentColor(validColor);
    } else {
      alert("کد رنگ وارد شده نامعتبر است!"); // پیام هشدار در صورت نامعتبر بودن
      setInputValue(color); // بازگرداندن مقدار ورودی به رنگ معتبر قبلی
    }
  };

  // هندل کردن فشردن Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateAndApplyColor(); // فراخوانی تابع اعتبارسنجی وقتی کلید Enter فشرده شد
    }
  };

  // هندل کردن تغییرات در ورودی color picker
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value); // به‌روزرسانی رنگ
    setInputValue(value); // به‌روزرسانی ورودی متنی با رنگ جدید
    if (onColorChange) {
      onColorChange(value);
    }
    addRecentColor(value);
  };

  // ریست کردن رنگ به مشکی
  const handleReset = () => {
    const defaultColor = '#000000'; // رنگ مشکی
    setColor(defaultColor);
    setInputValue(defaultColor);
    if (onColorChange) {
      onColorChange(defaultColor);
    }
  };

  // انتخاب رنگ از رنگ‌های اخیر
  const handleRecentColorClick = (recentColor: string) => {
    setColor(recentColor);
    setInputValue(recentColor);
    if (onColorChange) {
      onColorChange(recentColor);
    }
  };

  return (
    <div className='field-input'>
      <span className='b1-strong field-label'>{label}</span>
      <div className="color-input">
        {/* ورودی متنی بدون محدودیت تایپ */}
        <input
          type="text"
          value={inputValue}
          onChange={handleTextChange}
          onBlur={validateAndApplyColor} // اعتبارسنجی هنگام خروج از ورودی
          onKeyDown={handleKeyDown} // اعمال رنگ هنگام فشردن Enter
          className="b1 text-input"
          placeholder="#FFFFFF"
        />
        {/* ورودی color picker */}
       <div className='input-action'>
          <input
              type="color"
              value={color} // مقدار همگام‌شده با color picker
              onChange={handleColorChange}
              className="color-picker"
            />
            
          <div className='reset-div'>
            <OrButton
              layout='text'
              variant='secondary'
              appearance='outline'
              text='Reset' // تغییر متن دکمه به 'Reset'
              onClick={handleReset}
              size='xs'
            />
        </div>
      </div>
      </div>



      {/* نمایش رنگ‌های اخیر */}
      <div className="recent-colors">
        {recentColors.length > 0 && <span className='b1 recent-label'>Recent Colors</span>}
        <div>
        {recentColors.map((recentColor) => (
          <button

            key={recentColor}
            style={{ backgroundColor: recentColor }}
            className={`recent-color-btn ${recentColor === color ? 'active' : ''}`}
            onClick={() => handleRecentColorClick(recentColor)}
            title={recentColor}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default OrInput;
