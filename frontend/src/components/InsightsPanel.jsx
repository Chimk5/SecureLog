import React from 'react';

export default function InsightsPanel({ data }) {
  const { summary, findings, risk_score, risk_level, insights, action } = data;

  return (
    <div className="insights-content">
      <div className={`risk-level-card risk-${risk_level}`}>
        <div className="risk-level-title">Overall Risk Assessment</div>
        <div className="risk-level-value">{risk_level.toUpperCase()}</div>
        <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Risk Score: <strong>{risk_score}</strong> | Action: <strong>{action?.toUpperCase() || 'LOGGED'}</strong>
        </div>
      </div>

      <div className="ai-summary" style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>AI Analysis & Summary</strong>
        <p style={{ marginBottom: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>{summary}</p>
        {Array.isArray(insights) ? (
          <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-color)' }}>
            {insights.map((insight, idx) => (
              <li key={idx} style={{ marginBottom: '0.3rem' }}>{insight}</li>
            ))}
          </ul>
        ) : (
          <p>{insights}</p>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
          Detected Risks ({findings.length})
        </h3>
        {findings.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No sensitive data detected.</p>
        ) : (
          <div className="findings-list">
            {findings.map((f, i) => (
              <div key={i} className="finding-item" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <span className="finding-type" style={{ minWidth: '100px' }}>
                  {f.type.toUpperCase().replace('_', ' ')}
                </span>
                <span className="finding-line">Line {f.line}</span>
                {f.risk && (
                  <span 
                    style={{
                      marginLeft: 'auto', 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: f.risk === 'critical' ? 'rgba(239, 68, 68, 0.2)' : f.risk === 'high' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: f.risk === 'critical' ? '#ef4444' : f.risk === 'high' ? '#f59e0b' : '#10b981'
                    }}
                  >
                    {f.risk.toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
