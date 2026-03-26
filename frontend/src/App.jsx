import React, { useState } from 'react';
import axios from 'axios';
import { Upload, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import LogViewer from './components/LogViewer';
import InsightsPanel from './components/InsightsPanel';
import './index.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [rawText, setRawText] = useState('');

  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file) => {
    if (!file) return;

    // Read for display
    const reader = new FileReader();
    reader.onload = (event) => setRawText(event.target.result);
    reader.readAsText(file);

    setLoading(true);
    const formData = new FormData();
    formData.append('input_type', 'file');
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysisData(response.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1><ShieldCheck size={48} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} />SecureLog</h1>
        <p>AI-Powered Secure Data Intelligence Platform</p>
      </header>

      {!analysisData && !loading && (
        <section 
          className={`upload-section ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging ? '2px dashed var(--accent-color)' : '1px solid var(--border-color)',
            backgroundColor: isDragging ? 'rgba(74, 144, 226, 0.1)' : 'var(--panel-bg)',
            transition: 'all 0.3s ease'
          }}
        >
          <AlertTriangle size={48} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
          <h2>Analyze Your Logs for Risks</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Drag and drop or upload your `.log` or `.txt` files to detect sensitive data like API keys, passwords, and emails.
          </p>
          <label className="upload-btn">
            <Upload size={20} />
            Upload Log File
            <input 
              type="file" 
              accept=".log,.txt" 
              onChange={handleFileUpload} 
              className="hidden-input" 
            />
          </label>
        </section>
      )}

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <h3>Analyzing Logs...</h3>
          <p>Running detection engine and generating AI insights</p>
        </div>
      )}

      {analysisData && !loading && (
        <main className="dashboard">
          <div className="panel">
            <div className="panel-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} /> Log Viewer
              </span>
            </div>
            <LogViewer text={rawText} findings={analysisData.findings} />
          </div>

          <div className="panel">
            <div className="panel-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} /> AI Insights
              </span>
            </div>
            <InsightsPanel data={analysisData} />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
