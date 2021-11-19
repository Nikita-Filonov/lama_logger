from typing import Dict

from core.projects.helpers.actions.formatters.utils import default
from core.projects.localization.en.projects import FIELDS_EN
from core.users.models import CustomUser

LANGUAGES = {
    'en': FIELDS_EN,
}


def project_title(**kwargs) -> Dict[str, str]:
    """
    :param kwargs:
    :return:
    """
    return default(LANGUAGES, 'title', **kwargs)


def project_short(**kwargs) -> Dict[str, str]:
    """
    :param kwargs:
    :return:
    """
    return default(LANGUAGES, 'short', **kwargs)


def project_description(**kwargs) -> Dict[str, str]:
    """
    :param kwargs:
    :return:
    """
    return default(LANGUAGES, 'description', **kwargs)


def project_creator(**kwargs) -> Dict[str, str]:
    """
    :param kwargs:
    :return:
    """
    from_creator = CustomUser.objects.get(id=kwargs['from'])
    to_creator = CustomUser.objects.get(id=kwargs['to'])
    context = {'from': from_creator.username, 'to': to_creator}
    return default(LANGUAGES, 'creator', **context)


PROJECT_FIELDS = {
    'Project.title': project_title,
    'Project.short': project_short,
    'Project.creator': project_creator,
    'Project.description': project_description,
}
