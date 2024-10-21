import React, { useEffect, useState, CSSProperties } from 'react';
import './IconList.scss';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import loadingG from '../../assets/loading.gif';
import OrButton from '../OrButton/OrButton';
import Fuse from 'fuse.js';
import JSZip from 'jszip';
import Icon from '../../assets/Icon';

interface StrokeIconProps {
  searchTerm: string;
  selectedFolders: string[];
  strokeColor: string;
  strokeWidth: number;
}

interface Icon {
  name: string;
  path: string;
  similarNames?: string[];
}

const StrokeIcon: React.FC<StrokeIconProps> = ({ searchTerm, selectedFolders, strokeColor, strokeWidth }) => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<{ [key: string]: string }>({});
  const [copyMessages, setCopyMessages] = useState<{ [key: string]: string | null }>({});
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get('https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir?prefix=icons/stroke&max-keys=1000');
        const parser = new XMLParser();
        const jsonData = parser.parse(response.data);
        const StrokeIcon = jsonData.ListBucketResult.Contents.map((item: any) => ({
          name: item.Key.split('/').pop(),
          path: item.Key,
        }));

        const jsonResponse = await axios.get(`https://orbit-website.s3.ir-thr-at1.arvanstorage.ir/IconList.json?t=${Date.now()}`);
        const similarNamesData = jsonResponse.data;

        const iconsWithSimilarNames = StrokeIcon.map((icon: Icon) => {
          const similarNamesEntry = similarNamesData[icon.name.replace('.svg', '')];
          const similarNames = similarNamesEntry ? similarNamesEntry : [];
          return { ...icon, similarNames };
        });

        setIcons(iconsWithSimilarNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching icons:', error);
        setError('Error receiving icons');
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  const fetchSvgContent = async (url: string, iconName: string) => {
    try {
      const response = await axios.get(url);
      let svgData = response.data;

      const svgWithCurrentColor = svgData
        .replace(/stroke="[^"]*"/g, `stroke="currentColor"`)
        .replace(/stroke-width="[^"]*"/g, `stroke-width="currentWidth"`);

      setSvgContent((prev) => ({
        ...prev,
        [iconName]: svgWithCurrentColor,
      }));
    } catch (error) {
      console.error('Error fetching SVG content:', error);
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

  useEffect(() => {
    icons.forEach(icon => {
      const imageUrl = `https://orbit-icon.s3.ir-thr-at1.arvanstorage.ir/${icon.path}`;
      fetchSvgContent(imageUrl, icon.name);
    });
  }, [icons]);

  const downloadSvg = (iconName: string, svgContent: string) => {
    let svg = svgContent;

    svg = svg
      .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
      .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = iconName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadSelectedIcons = () => {
    const zip = new JSZip();
    selectedIcons.forEach((icon) => {
      let svg = svgContent[icon.name];

      if (svg) {
        svg = svg
          .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
          .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);

        zip.file(icon.name, svg);
      }
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'selected-icons.zip';
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const fuse = new Fuse(icons, {
    threshold: 0.3,
    includeMatches: true,
    keys: ['name', 'similarNames'],
  });
  const result = fuse.search(searchTerm);
  const filteredIcons = searchTerm
    ? result.map(({ item }) => item)
    : icons;

  const finalIcons = filteredIcons
    .filter((icon) => icon.name.toLowerCase().endsWith('.svg'))
    .filter((icon) => {
      const iconFolder = icon.path.split('/')[2];
      return selectedFolders.length === 0 || selectedFolders.includes(iconFolder);
    })
    .sort((a, b) => a.name.localeCompare(b.name)); 

    // const copyToClipboard = (iconName: string, svgContent: string) => {
    //   let svg = svgContent;
    
    //   // تنظیم مقدار stroke و stroke-width قبل از کپی
    //   svg = svg
    //     .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
    //     .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);
    
    //   navigator.clipboard.writeText(svg).then(() => {
    //     setCopyMessages((prev) => ({
    //       ...prev,
    //       [iconName]: 'Copied!!',
    //     }));
    
    //     setTimeout(() => {
    //       setCopyMessages((prev) => ({
    //         ...prev,
    //         [iconName]: null,
    //       }));
    //     }, 2000);
    //   }).catch((err) => {
    //     console.error('Failed to copy SVG: ', err);
    //   });
    // };

    const CopyButton: React.FC<{ svg: string, strokeColor: string, strokeWidth: number }> = ({ svg, strokeColor, strokeWidth }) => {
      const [buttonText, setButtonText] = useState('Copy');
    
      const handleCopySvg = () => {
       
        let svgContentLocal = svg
          .replace(/stroke="currentColor"/g, `stroke="${strokeColor}"`)
          .replace(/stroke-width="currentWidth"/g, `stroke-width="${strokeWidth}px"`);
    
     
        navigator.clipboard.writeText(svgContentLocal).then(() => {
          setButtonText('Copied');
    
          
          setTimeout(() => {
            setButtonText('Copy');
          }, 2000);
        });
      };
    
      return (
        <OrButton
          layout='icon-text'
          appearance='outline'
          text={buttonText}
          variant='secondary'
          icon={<Icon.copy />}
          onClick={handleCopySvg}
        />
      );
    };



  const toggleSelectIcon = (icon: Icon) => {
    if (selectedIcons.includes(icon)) {
      setSelectedIcons(selectedIcons.filter((i) => i !== icon));
    } else {
      setSelectedIcons([...selectedIcons, icon]);
    }
  };

  const removeSelectedIcon = (icon: Icon) => {
    setSelectedIcons(selectedIcons.filter((i) => i !== icon));
  };

  const downloadText = `Download ( ${selectedIcons.length} ) Icons`;

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
          {finalIcons.length > 0 ? (
            finalIcons.map((icon) => (
              <div 
                className={`item ${selectedIcons.includes(icon) ? 'selected' : ''}`} 
                key={icon.path} 
                onClick={() => toggleSelectIcon(icon)}
                // تنظیم استایل CSS با متغیرهای سفارشی
                // style={{ 
                //   color: strokeColor, 
                //   '--stroke-width': `${strokeWidth}px` } as CSSProperties}
              >
                {svgContent[icon.name] ? (
                <div className="icon-wrapper">
                  <div
                    className="svg-container"
                    dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                    style={{
                      color: strokeColor,
                      strokeWidth: strokeWidth, // مستقیماً مقدار strokeWidth تنظیم می‌شود
                    }}
                  />
                </div>
              ) : (
                <span className="skelton"></span>
              )}
                <span className=" c1-strong icon-name">{formatIconName(icon.name)}</span>
                {copyMessages[icon.name] && (
                  <div className="tooltip">
                    {copyMessages[icon.name]}
                  </div>
                )}
              </div>
            ))
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
      {/* نمایش متفاوت برای حالت انتخاب یک آیکون */}
      {selectedIcons.length === 1 ? (
        <div className='svg-code'>
          

          <div className="svg-preview-box" >
            {/* نمایش بزرگ SVG */}
            <div
              className="svg-preview"
              dangerouslySetInnerHTML={{ __html: svgContent[selectedIcons[0].name] }}
              style={{
                color: strokeColor,
                strokeWidth: strokeWidth,
              }}
            />
            {/* <div>

            <div>Stroke color: {strokeColor}</div>
            <div>Stroke width: {strokeWidth}</div>



           </div> */}
            <div className="b2-strong icon-name">
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
              onClick={() => downloadSvg(selectedIcons[0].name, svgContent[selectedIcons[0].name])}
            />
            {/* <OrButton
              layout='icon-text'
              text='Copy'
              appearance='outline'
              variant='secondary'
              icon={<Icon.copy />}
              onClick={() => copyToClipboard(selectedIcons[0].name, svgContent[selectedIcons[0].name])}
            /> */}
             <CopyButton 
                svg={svgContent[selectedIcons[0].name]} 
                strokeColor={strokeColor}  
                strokeWidth={strokeWidth}         
              />

          </div>
          <span className='t1-strong icon-sidepanel-name'>SVG:</span>
          {/* نمایش کد SVG */}
          <div className="svg-code-box">
            
              <code className='b2'>
                {svgContent[selectedIcons[0].name]}
              </code>
            
          </div>
        </div>
      ) : (
        // نمایش لیست آیکون‌ها برای دو یا بیشتر انتخاب‌شده
        selectedIcons.map((icon) => (
          <div className='side-panel-item' key={icon.name}>
            <div className='side-panel-item-body'>
              <div
                className="sidepabel-svg-container"
                dangerouslySetInnerHTML={{ __html: svgContent[icon.name] }}
                style={{
                  color: strokeColor,
                  strokeWidth: strokeWidth,
                }}
              />
              <span>{formatIconName(icon.name)}</span>
              <OrButton
                variant='error'
                appearance='ghost'
                size='sm'
                layout='icon'
                icon={<Icon.trash />}
                onClick={() => removeSelectedIcon(icon)} 
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
          onClick={downloadSelectedIcons}
        />
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default StrokeIcon;
