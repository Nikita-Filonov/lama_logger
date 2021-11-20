import json
from random import choice, randint
from string import ascii_letters, digits


def random_string(start=10, end=20):
    """
    :return:
    """
    return ''.join(choice(ascii_letters + digits) for _ in range(randint(start, end)))


def to_json(response):
    """
    :param response:
    :return:
    """
    return json.loads(json.dumps(
        response.data,
        indent=4,
        sort_keys=True,
        default=str
    ))
