from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from dotenv import load_dotenv

from models import AnalyzeResponse
from services.parser import parse_log
from services.detection import detect_sensitive_data
from services.risk_engine import calculate_risk
from services.ai_insights import generate_insights

# Load env variables (for OPENAI_API_KEY)
load_dotenv()

app = FastAPI(title="SecureLog AI Data Intelligence Platform")

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_log(
    input_type: str = Form(default="text"),
    content: Optional[str] = Form(default=None),
    file: Optional[UploadFile] = File(default=None)
):
    """
    Analyze logs for sensitive data and risks.
    Accepts raw text or file uploads.
    """
    log_text = ""
    
    if input_type == "file" and file:
        log_bytes = await file.read()
        try:
            log_text = log_bytes.decode('utf-8')
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="File must be valid UTF-8 text.")
    elif content:
        log_text = content
    else:
        raise HTTPException(status_code=400, detail="Must provide either 'content' text or 'file' upload.")
        
    lines = parse_log(log_text)
    findings = detect_sensitive_data(lines)
    score, level = calculate_risk(findings)
    insights = generate_insights(log_text)
    
    return {
        "summary": f"Analyzed {len(lines)} lines of logs.",
        "content_type": "logs",
        "findings": findings,
        "risk_score": score,
        "risk_level": level,
        "action": "masked" if score > 4 else "logged",
        "insights": insights.split("\n") if isinstance(insights, str) else insights
    }
