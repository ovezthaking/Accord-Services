def parse_contact(request) -> dict:
    return request.data if isinstance(request.data, dict) else request.data.dict()
