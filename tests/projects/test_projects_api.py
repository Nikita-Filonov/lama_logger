import allure
import pytest
from rest_framework import status

from core.projects.permissions.roles import DEFAULT_ROLES
from core.projects.views.projects import ProjectsApi, ProjectApi
from tests.api import Endpoints, post, get, patch
from tests.params import get_project_payload
from tests.utils.utils import to_json

projects_view = ProjectsApi.as_view()
project_view = ProjectApi.as_view()

projects_api = Endpoints.PROJECTS.value


@pytest.mark.api
@pytest.mark.projects
@allure.epic('API')
@allure.feature('Projects')
@allure.severity(allure.severity_level.CRITICAL)
@pytest.mark.django_db(transaction=True)
class TestProjectsApi:

    @allure.title('Get projects')
    def test_get_projects(self, user):
        request = get(projects_api, user)
        response = projects_view(request)

        assert response.status_code == status.HTTP_200_OK

    @allure.title('Create project')
    def test_create_project(self, user):
        project_payload = get_project_payload()
        request = post(projects_api, project_payload, user)

        response = projects_view(request)
        json_response = to_json(response)

        assert response.status_code == status.HTTP_201_CREATED
        assert json_response['title'] == project_payload['title']
        assert json_response['short'] == project_payload['short']
        assert json_response['description'] == project_payload['description']
        assert len(json_response['members']) == 1
        assert len(json_response['roles']) == len(DEFAULT_ROLES)

    @allure.title('Update project')
    def test_update_project(self, project, user):
        project_payload = get_project_payload()
        request = patch(projects_api + f'{project.id}/', project_payload, user)

        response = project_view(request, project_id=project.id)
        json_response = to_json(response)

        assert response.status_code == status.HTTP_200_OK
        assert json_response['title'] == project_payload['title']
        assert json_response['short'] == project_payload['short']
        assert json_response['description'] == project_payload['description']
        assert len(json_response['members']) == 1
        assert len(json_response['roles']) == len(DEFAULT_ROLES)

    @allure.title('Get project')
    def test_get_project(self, project, project_json, user):
        request = get(projects_api + f'{project.id}/', user)
        response = project_view(request, project_id=project.id)
        json_response = to_json(response)

        assert response.status_code == status.HTTP_200_OK
        assert json_response['id'] == project_json['id']
        assert json_response['title'] == project_json['title']
        assert json_response['short'] == project_json['short']
        assert json_response['description'] == project_json['description']
        assert json_response['members'] == project_json['members']
        assert json_response['roles'] == project_json['roles']
