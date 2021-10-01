import ast


def query_to_dict(query: dict, parse=False) -> dict:
    """Parse url query and makes dict from it"""
    if parse:
        return {field: ast.literal_eval(str(value)) for field, value in query.items()}

    return {field: str(value) for field, value in query.items()}
