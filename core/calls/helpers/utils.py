from typing import List


def to_header_payload(headers) -> List[dict]:
    return [
        {'key': key, 'value': value, 'include': True}
        for key, value in headers.items()
    ]
