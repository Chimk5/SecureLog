from pydantic import BaseModel
from typing import List, Optional

class FindingModel(BaseModel):
    type: str
    line: int
    risk: str
    value: Optional[str] = None

class AnalyzeResponse(BaseModel):
    summary: str
    content_type: str
    findings: List[FindingModel]
    risk_score: int
    risk_level: str
    action: str
    insights: List[str]
