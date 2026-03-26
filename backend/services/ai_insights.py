import os
from openai import OpenAI

# Initialize client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_insights(log_text: str) -> str:
    try:
        # 🔥 OpenAI API call
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a cybersecurity analyst."},
                {
                    "role": "user",
                    "content": f"""
Analyze the following logs and identify:
- Sensitive data exposure
- Security risks
- Anomalies

Logs:
{log_text}
"""
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("OpenAI ERROR:", e)

        # ✅ fallback (VERY IMPORTANT)
        return fallback_insights(log_text)


# 🔥 fallback (so app never crashes)
def fallback_insights(log_text: str) -> str:
    insights = []

    if "password" in log_text:
        insights.append("Password detected in logs (critical risk)")

    if "api_key" in log_text or "sk-" in log_text:
        insights.append("API key exposed in logs (high risk)")

    if "ERROR" in log_text:
        insights.append("System error detected (possible leak)")

    if "email" in log_text:
        insights.append("Email found in logs (low risk)")

    if not insights:
        insights.append("No major risks detected")

    return "\n".join(insights)