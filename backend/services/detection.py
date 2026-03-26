import re

patterns = {
    "password": {"regex": r"password\s*=\s*\S+", "risk": "critical"},
    "api_key": {"regex": r"sk-[a-zA-Z0-9]+", "risk": "high"},
    "token": {"regex": r"token\s*=\s*\S+", "risk": "high"},
    "email": {"regex": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", "risk": "low"},
    "phone": {"regex": r"\b\d{10}\b", "risk": "low"}
}

def detect_sensitive_data(lines: list[str]) -> list[dict]:
    """
    Detects sensitive patterns in a list of log lines.
    Returns findings with the pattern type, risk, and 1-based line number.
    """
    findings = []
    for i, line in enumerate(lines):
        for key, info in patterns.items():
            if re.search(info["regex"], line):
                findings.append({
                    "type": key,
                    "line": i + 1,
                    "risk": info["risk"]
                })
    return findings
