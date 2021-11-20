import allure
import pytest


@pytest.mark.unit
@pytest.mark.projects
@allure.epic('Unit')
@allure.feature('Projects')
@allure.severity(allure.severity_level.CRITICAL)
@pytest.mark.django_db(transaction=True)
class TestProjectsUnit:
    @allure.title('Project title')
    def test_project_title(self, project):
        title = project._meta.get_field('title')

        assert title.max_length == 255
        assert not title.null

    @allure.title('Project description')
    def test_project_description(self, project):
        description = project._meta.get_field('description')

        assert description.blank
        assert description.null

    @allure.title('Project short')
    def test_project_short(self, project):
        short = project._meta.get_field('short')

        assert short.max_length == 2
        assert not short.blank
        assert not short.null
