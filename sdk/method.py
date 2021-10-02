import json

import requests

from sdk.logger import LamaLogger

logger = LamaLogger(token='ec89ccd61f5312e2cf5e037e2f97a5678030c14f', project_id=2)


def get(url, params=None, **kwargs):
    response = requests.get(url, params=params, **kwargs)
    logger(response)
    return response


def post(url, data=None, json=None, **kwargs):
    response = requests.post(url, data=data, json=json, **kwargs)
    logger(response)
    return response


get('http://localhost:8000/api/v1/projects/1/requests/',
    headers={'Content-Type': 'application/json', 'Authorization': 'Token ec89ccd61f5312e2cf5e037e2f97a5678030c14f'},
    data=json.dumps({'hello': 1}))
