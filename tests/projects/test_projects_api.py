import allure
import pytest
from rest_framework.status import HTTP_201_CREATED

from core.projects.permissions.roles import DEFAULT_ROLES
from core.projects.views.projects import ProjectsApi, ProjectApi
from tests.api import Endpoints, post
from tests.params import get_project_payload
from tests.utils.utils import to_json

projects_view = ProjectsApi.as_view()
project_view = ProjectApi.as_view()

projects_api = Endpoints.PROJECTS.value


@pytest.mark.projects
@allure.epic('API')
@allure.feature('Projects')
@allure.severity(allure.severity_level.CRITICAL)
@pytest.mark.django_db(transaction=True)
class TestMonstersApi:
    @allure.title('Create project')
    def test_create_project(self, user):
        project_payload = get_project_payload()
        request = post(projects_api, project_payload, user)

        response = projects_view(request)
        json_response = to_json(response)

        assert response.status_code == HTTP_201_CREATED
        assert json_response['title'] == project_payload['title']
        assert json_response['short'] == project_payload['short']
        assert json_response['description'] == project_payload['description']
        assert len(json_response['members']) == 1
        assert len(json_response['roles']) == len(DEFAULT_ROLES)
