import requests

from sdk.logger import LamaLogger

logger = LamaLogger(token='ad542e4229f256c88a1482ba8ab5a330266f6198', project_id=1)


def get(url, params=None, **kwargs):
    response = requests.get(url, params=params, **kwargs)
    logger(response)
    return response


def post(url, data=None, json=None, **kwargs):
    response = requests.post(url, data=data, json=json, **kwargs)
    logger(response)
    return response
