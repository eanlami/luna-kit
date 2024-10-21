import * as React from 'react';
import './OrLogs.scss';
import '../../base/style.scss';

interface OrMenu {
    itemLogs: { 
      date: string; 
      version: string; 
      changes: { text: string[]; type: string; }[];
    }[];
}

const OrMenu: React.FunctionComponent<OrMenu> = ({
  itemLogs,
}) => {
  return (
    <div>
      <div className="logs">
        {itemLogs.map((item, index) => (
          <div className="logs-item" key={index}>
            <div className='logs-header'>
              <span className="b2-strong">{item.date}</span>
              <span className="b2 logs-version">{item.version}</span>
            </div>
            <div className="changes-list">
              {item.changes.map((change, idx) => (
                <div key={idx} className="logs-list">
                  <span className="b2 logs-type">{change.type}</span>
                  {Array.isArray(change.text) ? (
                    <ul className='logs-list-item'>
                      {change.text.map((textItem, textIdx) => (
                        <li className='t1' key={textIdx}>{textItem}</li>
                      ))}
                    </ul>
                  ) : (
                    <span> {change.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrMenu;
