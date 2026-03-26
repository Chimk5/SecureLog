import React, { useState, useMemo } from 'react';

const MASK_MAP = {
  'email': '[MASKED_EMAIL]',
  'phone': '[MASKED_PHONE]',
  'api_key': '[MASKED_API_KEY]',
  'password': '[MASKED_PASSWORD]',
  'token': '[MASKED_TOKEN]'
};

export default function LogViewer({ text, findings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [maskData, setMaskData] = useState(false);

  const lines = useMemo(() => text.split('\\n'), [text]);

  // Create a mapping of line number to finding for O(1) lookups
  const findingsMap = useMemo(() => {
    const map = {};
    findings.forEach(f => {
      if (!map[f.line]) map[f.line] = [];
      map[f.line].push(f.type);
    });
    return map;
  }, [findings]);

  const renderLineText = (lineContent, types, mask) => {
    if (!types || types.length === 0) return lineContent;
    
    // Simple naive masking for demo purposes: 
    // Just append an indicator or replace if mask is true
    if (mask) {
      return `*** SENSITIVE DATA HIDDEN [${types.join(', ')}] ***`;
    }

    return lineContent;
  };

  return (
    <>
      <div className="log-viewer-controls">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search in logs..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="toggle-mask-btn" onClick={() => setMaskData(!maskData)}>
          {maskData ? 'Unmask Data' : 'Mask Data'}
        </button>
      </div>
      <div className="log-content">
        {lines.map((line, index) => {
          const lineNum = index + 1;
          const isRisky = !!findingsMap[lineNum];
          const hasSearchMatch = searchTerm && line.toLowerCase().includes(searchTerm.toLowerCase());
          
          if (searchTerm && !hasSearchMatch) return null;

          return (
            <div key={index} className={`log-line ${isRisky ? 'line-risk border-left-risk' : ''}`}>
              <div className="line-number">{lineNum}</div>
              <div className="line-text">
                {renderLineText(line, findingsMap[lineNum], maskData)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
