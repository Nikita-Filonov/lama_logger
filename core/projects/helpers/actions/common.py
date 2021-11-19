from core.projects.helpers.actions.formatters.common import FIELDS
from django.forms import model_to_dict

from core.projects.helpers.utils import get_member
from core.projects.models import ProjectAction


def update_action(user, project, instance, state_before, **kwargs):
    """
    :param project:
    :param user:
    :param instance:
    :param state_before:
    :return:
    """
    member = get_member(project, user)
    state_after = model_to_dict(instance)
    name = instance.__class__.__name__

    changed_fields = [
        {'from': state_before[key_before], 'to': state_after[key_after], 'key': key_after}
        for key_before, key_after
        in zip(state_before, state_after)
        if state_before[key_before] != state_after[key_after]
    ]
    # # Checking which fields actually was changed. And if some fields
    # has been changed, then we making query like that
    # {
    #     'from': value before (1),
    #     'to': value after (2),
    #     'key': 'monster'
    # }

    if not changed_fields:
        # But if not fields changed, then we just no need write any history
        return

    for field in changed_fields:  # for {'from': 1, 'to': 2, key: 'monster'}
        # getting formatted message
        # and adding it to content
        content = FIELDS[f"{name}.{field['key']}"](**field, instance=instance)

        ProjectAction.objects.create(
            project=project,
            member=member,
            title_en=content['en'],
            **kwargs
        )


def action(user, project, instance, action_type, **kwargs):
    """
    :param action_type:
    :param project:
    :param user:
    :param instance:
    :return:
    """
    member = kwargs.pop('member', None) or get_member(project, user)
    name = instance.__class__.__name__

    content = FIELDS[f"{name}.{action_type}"](instance=instance, **kwargs)

    ProjectAction.objects.create(
        project=project,
        member=member,
        title_en=content['en'],
        **kwargs
    )
