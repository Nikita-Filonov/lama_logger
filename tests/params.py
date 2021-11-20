from tests.utils.utils import random_string

users_data = {
    'id': 1,
    'email': 'test1@gmail.com',
    'password': '12345',
    'username': 'user_1'
}


def get_project_payload():
    return {
        'title': random_string(),
        'short': random_string(2, 2),
        'description': random_string()
    }
