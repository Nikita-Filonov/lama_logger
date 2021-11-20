from core.calls.models import Request, RequestsFilter
from core.projects.models import Project, Member, Role, ProjectSettings, ProjectTask


def filter_scopes(scopes, *args):
    """
    :param scopes:
    :param args:
    :return:
    """
    if not args:
        return scopes

    return [scope for scope in scopes if any(arg in scope for arg in args)]


def to_scope(model) -> list:
    """
    :param model:
    :return:
    """
    return [model.VIEW, model.CREATE, model.UPDATE, model.DELETE]


PROJECT = Project.SCOPES
PROJECT_SETTINGS = ProjectSettings.SCOPES
PROJECT_TASK = ProjectTask.SCOPES
ROLE = Role.SCOPES
MEMBER = Member.SCOPES

REQUEST = Request.SCOPES
REQUESTS_FILTER = RequestsFilter.SCOPES


class Admin:
    name = 'Administrator'
    scopes = [
        *PROJECT,
        *ROLE,
        *MEMBER,
        *PROJECT_SETTINGS,
        *PROJECT_TASK,
        *REQUEST,
        *REQUESTS_FILTER
    ]


class Developer:
    name = 'Developer'
    scopes = [
        *filter_scopes(PROJECT, 'view'),
        *filter_scopes(PROJECT_SETTINGS, 'view'),
        *filter_scopes(PROJECT_TASK, 'view'),
        *filter_scopes(ROLE, 'view'),
        *filter_scopes(MEMBER, 'view'),
        *REQUEST,
        *REQUESTS_FILTER
    ]


class AutomationEngineer:
    name = 'Automation engineer'
    scopes = [
        *filter_scopes(PROJECT, 'view'),
        *filter_scopes(PROJECT_SETTINGS, 'view'),
        *filter_scopes(PROJECT_TASK, 'view'),
        *filter_scopes(ROLE, 'view'),
        *filter_scopes(MEMBER, 'view'),
        *REQUEST,
        *REQUESTS_FILTER,
    ]


class AccountManager:
    name = 'Account manager'
    scopes = [
        *filter_scopes(PROJECT, 'view'),
        *filter_scopes(PROJECT_SETTINGS, 'view'),
        *filter_scopes(PROJECT_TASK, 'view'),
        *filter_scopes(ROLE, 'view'),
        *filter_scopes(MEMBER, 'view'),
        *ROLE,
        *MEMBER,
    ]


DEFAULT_ROLES = [Admin, Developer, AccountManager, AutomationEngineer]
