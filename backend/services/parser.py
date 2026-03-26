def parse_log(content: str) -> list[str]:
    """
    Parse log content into individual lines.
    """
    if not content:
        return []
        
    return content.replace('\\r\\n', '\\n').split('\\n')
