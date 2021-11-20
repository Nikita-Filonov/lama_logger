import json
from enum import Enum

import allure
from rest_framework.test import APIRequestFactory, force_authenticate

factory = APIRequestFactory()


class Endpoints(Enum):
    PROJECTS = '/api/v1/projects/'


def get(url, user=None, with_auth=True, **kwargs):
    with allure.step(f'Marking GET request to {url}'):
        request = factory.get(url, **kwargs)
        if with_auth and user is not None:
            force_authenticate(request, user=user)

        return request


def post(url, data, user=None, with_auth=True, **kwargs):
    with allure.step(f'Marking POST request to {url} with payload {data}'):
        request = factory.post(url, data=json.dumps(data), content_type='application/json', **kwargs)
        if with_auth and user is not None:
            force_authenticate(request, user=user)

        return request


def patch(url, data, user=None, with_auth=True, **kwargs):
    with allure.step(f'Marking PATCH request to {url} with payload {data}'):
        request = factory.patch(url, data=json.dumps(data), content_type='application/json', **kwargs)
        if with_auth and user is not None:
            force_authenticate(request, user=user)

        return request
