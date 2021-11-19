from typing import Dict

from core.projects.helpers.actions.formatters.utils import default
from core.projects.localization.en.projects import FIELDS_EN

LANGUAGES = {
    'en': FIELDS_EN,
}


def project_title(**kwargs) -> Dict[str, str]:
    """
    :param kwargs:
    :return:
    """
    return default(LANGUAGES, 'title', **kwargs)


def project_title(**kwargs) -> Dict[str, str]:
    """
    :param kwargs:
    :return:
    """
    return default(LANGUAGES, 'title', **kwargs)


PROJECT_FIELDS = {
    'Project.title': project_title,
}
