# SecureLog AI Platform

SecureLog is a full-stack, AI-powered log analysis and risk detection platform. It is designed to ingest application logs, pinpoint sensitive data such as PII (Personally Identifiable Information) or credentials, calculate risk metrics, and generate AI-driven insights to help identify latent issues or anomalous patterns.

## Features

- **Automated Sensitive Data Detection:** Uses regex-based parsing to find leaked API keys, credit card numbers, passwords, emails, and more.
- **Risk Evaluation:** Automatically scores the severity of exposed data and categorizes the log event into risk levels (Safe, Low, Medium, High, Critical).
- **AI-Powered Insights:** Integrates with OpenAI to automatically analyze textual patterns within the logs, providing human-readable explanations of potential vulnerabilities.
- **Modern Web Interface:** A React-based, visually responsive dashboard for log uploading, analysis tracking, and data exploration.

## Tech Stack

- **Backend:** FastAPI, Python, Uvicorn, OpenAI API
- **Frontend:** React, Vite, Axios, Lucide React (for icons)

## Project Structure

```
SecureLog/
├── backend/          # FastAPI backend services
│   ├── main.py       # API entry point & routes
│   ├── models.py     # Pydantic data models
│   ├── services/     # Core business logic (parser, risk_engine, ai_insights)
│   └── requirements.txt
├── frontend/         # React SPA frontend (Vite)
│   ├── src/          # Components and hooks
│   ├── package.json  # NPM dependencies
│   └── vite.config.js
├── requirements.txt  # Root requirements.txt for backend
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- An OpenAI API Key (for the `ai_insights` service)

### 1. Setting up the Backend

1. Navigate to the root directory `SecureLog`.
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the `.env` file inside the `backend/` directory and add your OpenAI API Key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the FastAPI development server:
   ```bash
   python -m uvicorn backend.main:app --reload
   ```
   The backend API will be running at [http://127.0.0.1:8000](http://127.0.0.1:8000).

### 2. Setting up the Frontend

1. Open a new terminal and navigate to the `frontend/` directory.
2. Install the necessary NPM packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will be running at [http://localhost:5173](http://localhost:5173).

## API Documentation

When the backend server is running, the interactive API documentation provided by Swagger UI is available at:
- Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
