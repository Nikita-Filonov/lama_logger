import re
from enum import Enum
from itertools import chain

from core.projects.helpers.utils import get_member


class Action(Enum):
    GET = 'read'
    POST = 'create'
    PATCH = 'update'
    DELETE = 'delete'


def to_scope(model):
    """
    Make dict of scopes for give model
    """
    model_name = model.__name__
    return {
        'GET': f'%s.View' % model_name,
        'POST': f'%s.Create' % model_name,
        'PATCH': f'%s.Update' % model_name,
        'DELETE': f'%s.Delete' % model_name
    }


def common_check(view, request, scopes):
    """The common check for all models"""
    member = get_member(view.kwargs['project_id'], request.user)
    if not member:
        return

    member_roles = list(chain.from_iterable([role.scope for role in member.roles.all()]))
    return scopes[request.method] in member_roles


def to_forbid_message(method, model):
    action = Action[method]

    model_parts = re.findall('[A-Z][^A-Z]*', model.__name__)
    model_name = ' '.join([part.lower() for part in model_parts])

    return f'You can not {action.value} {model_name} of this project'
