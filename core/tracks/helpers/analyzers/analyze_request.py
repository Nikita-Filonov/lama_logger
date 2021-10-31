import re
import threading


def analyze_request(payload: dict):
    print(re.match(r"hello[0-9]+", 'hello1'))
    print(payload['requestUrl'])
