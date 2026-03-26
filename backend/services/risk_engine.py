risk_score_map = {
    "critical": 5,
    "high": 4,
    "medium": 3,
    "low": 1
}

def calculate_risk(findings: list[dict]) -> tuple[int, str]:
    """
    Calculates the total risk score and assigns a risk level.
    Score > 8 -> high
    Score > 4 -> medium
    Otherwise -> low
    """
    score = sum(risk_score_map.get(f.get("risk", "low"), 1) for f in findings)
    
    level = "low"
    if score > 8:
        level = "high"
    elif score > 4:
        level = "medium"
        
    return score, level
