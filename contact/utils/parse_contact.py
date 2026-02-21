def parse_contact(request) -> dict:
    if isinstance(request.data, dict):
        return request.data
    return request.data.dict()
