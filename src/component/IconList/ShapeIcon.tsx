import React, { useEffect, useState } from 'react';
import './IconList.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import '../../base/type-style.scss';
import Fuse from 'fuse.js';
import JSZip from 'jszip'; // import JSZip
import OrButton from '../OrButton/OrButton';
import Icon from '../../assets/Icon';

interface ShapeIconProps {
  searchTerm: string;
  switchChecked: boolean;
  selectedFolders: string[];
  iconColor: string;
}

interface Icon {
  name: string;
  path: string;
  similarNames?: string[];
}

const ShapeIcon: React.FC<ShapeIconProps> = ({
  searchTerm,
  switchChecked,
  selectedFolders,
  iconColor,
}) => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
  const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get(
          'https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/shape&max-keys=1000'
        );
        const parser = new XMLParser();
        const jsonData = parser.parse(response.data);
        const fetchedIcons = jsonData.ListBucketResult.Contents.map((item: any) => ({
          name: item.Key.split('/').pop(),
          path: item.Key,
        }));
        setIcons(fetchedIcons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching icons:', error);
        setError('Error receiving icons');
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(icons, {
      threshold: 0.3,
      keys: ['name'],
    });
    const result = fuse.search(searchTerm);
    const iconsToBeFiltered = searchTerm
      ? result.map(({ item }) => item)
      : icons;

    const filtered = iconsToBeFiltered
      .filter((icon) => {
        const iconType = switchChecked ? 'fill' : 'outline';
        return icon.path.includes(iconType);
      })
      .filter((icon) => icon.name.toLowerCase().endsWith('.svg'))
      .filter((icon) => {
        const iconFolder = icon.path.split('/')[2];
        return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
      })
      .sort((a, b) => a.name.localeCompare(b.name)); 

    setFilteredIcons(filtered);
  }, [icons, searchTerm, switchChecked, selectedFolders]);

  const fetchSvgContent = async (url: string, iconName: string) => {
    try {
      const response = await axios.get(url);
      const svgData = response.data;

      // تغییر fill و stroke به currentColor
      const svgWithCurrentColor = svgData
        .replace(/fill="[^"]*"/g, `fill="currentColor"`)
        .replace(/stroke="[^"]*"/g, `stroke="currentColor"`);

      setSvgContent((prev) => ({
        ...prev,
        [iconName]: svgWithCurrentColor,
      }));
    } catch (error) {
      console.error('Error fetching SVG content:', error);
    }
  };

  useEffect(() => {
    filteredIcons.forEach((icon) => {
      const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
      fetchSvgContent(imageUrl, icon.name);
    });
  }, [filteredIcons]);

  const toggleIconSelection = (icon: Icon) => {
    if (selectedIcons.some(selectedIcon => selectedIcon.name === icon.name)) {
      const updatedSelectedIcons = selectedIcons.filter(selectedIcon => selectedIcon.name !== icon.name);
      setSelectedIcons(updatedSelectedIcons);

      if (updatedSelectedIcons.length === 0) {
        setIsSidePanelOpen(false);
      }
    } else {
      const updatedSelectedIcons = [...selectedIcons, icon];
      setSelectedIcons(updatedSelectedIcons);
      setIsSidePanelOpen(true);
    }
  };

  const formatIconName = (name: string) => {
    return name
      .replace('.svg', '')
      .replace(/-\d+$/, '')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const removeSelectedIcon = (iconName: string) => {
    const updatedIcons = selectedIcons.filter(icon => icon.name !== iconName);
    setSelectedIcons(updatedIcons);

    if (updatedIcons.length === 0) {
      setIsSidePanelOpen(false);
    }
  };

  const downloadSelectedIconsAsZip = async () => {
    const zip = new JSZip();

    for (const icon of selectedIcons) {
      let svg = svgContent[icon.name];
      if (svg) {
        // تغییر رنگ در زمان دانلود
        svg = svg
          .replace(/fill="currentColor"/g, `fill="${iconColor}"`)
          .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`);
        zip.file(icon.name, svg);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'YOKO Orbit v1 (selected_icons).zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setSelectedIcons([]);
    setIsSidePanelOpen(false);
  };

  // const handleCopySvg = () => {
  //   if (selectedIcons.length === 1) {
  //     const svg = svgContent[selectedIcons[0].name];
  //     navigator.clipboard.writeText(svg).then(() => {
  //       alert('کد SVG کپی شد!');
  //     });
  //   }
  // };

  const CopyButton: React.FC<{ svg: string }> = ({ svg }) => {
    const [buttonText, setButtonText] = useState('Copy');
  
    const handleCopySvg = () => {
      navigator.clipboard.writeText(svg).then(() => {
        setButtonText('Copied');
  
        // بازگرداندن متن به 'Copy' بعد از دو ثانیه
        setTimeout(() => {
          setButtonText('Copy');
        }, 2000);
      });
    };
  
    return (
      <OrButton
        layout='icon-text'
        appearance='outline'
        text={buttonText} // استفاده از متن ذخیره‌شده در state
        variant='secondary'
        icon={<Icon.copy />}
        onClick={handleCopySvg}
      />
    );
  };
  

  const downloadText = `Download ( ${selectedIcons.length} ) Icons`;

  const downloadSingleIcon = (icon: Icon) => {
    let svg = svgContent[icon.name];
    svg = svg
      .replace(/fill="currentColor"/g, `fill="${iconColor}"`)
      .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = icon.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="icon-body">
      {loading ? (
        <div className="loading">
          <img src={loadingG} alt="logo" width="160px" height="160px" />
          <span className='t1-strong'>Loading...</span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='icon-list-main'>
          <div className="icon-list">
            {filteredIcons.length > 0 ? (
              filteredIcons.map((icon) => {
                const svgData = svgContent[icon.name];
                const isSelected = selectedIcons.some(selectedIcon => selectedIcon.name === icon.name);
                return (
                  <div 
                    className={`item ${isSelected ? 'selected' : ''}`} 
                    key={icon.path} 
                    onClick={() => toggleIconSelection(icon)}
                    // تنظیم رنگ از طریق CSS
                    
                  >
                    {svgData ? (
                      <div className="icon-wrapper">
                        <div
                        style={{ color: iconColor }}
                          className="svg-shape-icon"
                          dangerouslySetInnerHTML={{ __html: svgData }}
                        />
                      </div>
                    ) : (
                      <span className="skelton"></span>
                    )}
                    <span className="c1-strong icon-name">{formatIconName(icon.name)}</span>
                  </div>
                );
              })
            ) : (
              <div>
                <span>Icon not found</span>
              </div>
            )}
          </div>
        </div>
      )}

          {selectedIcons.length > 0 && (
            <div className="side-panel">
              <div className='filter-header'>
                <h3>({selectedIcons.length}) Selected</h3>
                <OrButton
                  layout='icon'
                  appearance='ghost'
                  variant='secondary'
                  icon={<Icon.cross />}
                  onClick={() => { setSelectedIcons([]); }}
                />
              </div>
              
              <div className='side-panel-body'>
                {selectedIcons.length === 1 ? (
                  <div className='svg-code'>

                    <div className="svg-preview-box" >
                      {/* نمایش کامل و بزرگ SVG */}
                      <div
                        className="svg-preview"
                        dangerouslySetInnerHTML={{ __html: svgContent[selectedIcons[0].name] }}
                        style={{
                          color: iconColor, // استفاده از رنگ انتخابی
                        }}
                      />
                      {/* <div>

                        {iconColor}


                      </div> */}

                      <div className="t1-strong icon-sidepanel-name">
                      {formatIconName(selectedIcons[0].name)} {/* فرمت نام آیکون برای نمایش زیبا */}
                    </div>
                    </div>
                    <div className='single-download-box'>
                      <OrButton
                        layout='icon-text'
                        appearance='fill'
                        variant='primary'
                        icon={<Icon.download />}
                       
                        text='SVG'
                        onClick={() => downloadSingleIcon(selectedIcons[0])}
                      />
                      <CopyButton svg={svgContent[selectedIcons[0].name]} />

                    </div>

                    <span className='b2'>SVG Code</span>
                    {/* نمایش کد SVG */}
                    <div className="svg-code-box">
                      <pre>
                        <code>
                          {svgContent[selectedIcons[0].name]}
                        </code>
                      </pre>
                    </div>
                  </div>
                ) : (
                  // نمایش لیست آیکون‌ها زمانی که بیشتر از یک آیکون انتخاب‌شده
                  selectedIcons.map((icon) => (
                    <div className='side-panel-item' key={icon.name}>
                      <div className='side-panel-item-body'>
                        <div
                          className="sidepabel-svg-container"
                          style={{ color: iconColor }} // اعمال رنگ CSS برای آیکون‌های انتخابی
                          dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                        />
                        <span>{formatIconName(icon.name)}</span>
                        <OrButton
                          variant='error'
                          appearance='ghost'
                          size='sm'
                          layout='icon'
                          icon={<Icon.trash />}
                          onClick={() => removeSelectedIcon(icon.name)}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {selectedIcons.length > 1 && (
                <div className='dowload-button-box'>
                  <OrButton
                    layout='icon-text'
                    appearance='fill'
                    variant='primary'
                    icon={<Icon.download />}
                    text={downloadText}
                    onClick={downloadSelectedIconsAsZip}
                  />
                </div>
              )}
            </div>
          )}

    </div>
  );
};

export default ShapeIcon;
