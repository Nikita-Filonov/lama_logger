from itertools import chain

from core.projects.helpers.utils import get_member


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
    print(scopes[request.method] in member_roles)
    print(scopes[request.method], member_roles)
    return scopes[request.method] in member_roles
