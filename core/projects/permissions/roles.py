from core.projects.models import Project, Member, Role


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
ROLE = Role.SCOPES
MEMBER = Member.SCOPES


class Admin:
    name = 'Admin'
    scopes = [
        *PROJECT,
        *ROLE,
        *MEMBER,
    ]


class Editor:
    name = 'Editor'
    scopes = [
        *filter_scopes(PROJECT, 'view'),
        *filter_scopes(PROJECT, 'view'),
        *filter_scopes(PROJECT, 'view'),
    ]


class Viewer:
    name = 'Viewer'
    scopes = [
        *filter_scopes(PROJECT, 'view'),
        *filter_scopes(PROJECT, 'view'),
        *filter_scopes(PROJECT, 'view'),
    ]


class AccountManager:
    name = 'Account manager'
    scopes = [
        *filter_scopes(PROJECT, 'view'),
        *ROLE,
        *MEMBER,
    ]
