import pytest
from django.test import Client
from rest_framework.test import APIRequestFactory

from core.projects.models import Member
from core.projects.views.projects import ProjectsApi
from core.users.models import CustomUser
from tests.api import Endpoints, post
from tests.params import users_data, get_project_payload
from tests.utils.utils import to_json

pytest_plugins = []


@pytest.fixture(scope='class')
def factory(request):
    return APIRequestFactory()


@pytest.fixture(scope='class')
def client(request):
    return Client()


@pytest.fixture(scope='function')
@pytest.mark.django_db
def user():
    return CustomUser.objects.create_user(**users_data)


@pytest.fixture(scope='function')
def member(user):
    Member.objects.create()


@pytest.fixture(scope='function')
@pytest.mark.django_db
def project(factory, user):
    project_payload = get_project_payload()
    request = post(Endpoints.PROJECTS.value, project_payload, user)

    response = ProjectsApi.as_view()(request)
    return to_json(response)
