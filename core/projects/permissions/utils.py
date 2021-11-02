from core.projects.helpers.utils import get_member


def to_scope(model):
    """
    Make dict of scopes for give model
    """
    model_name = model.__name__
    return {
        'GET': f'%s.view' % model_name,
        'POST': f'%s.create' % model_name,
        'PATCH': f'%s.update' % model_name,
        'DELETE': f'%s.delete' % model_name
    }


def common_check(view, request, scopes):
    """The common check for all models"""
    member = get_member(view.kwargs['project_id'], request.user)
    if not member:
        return

    member_roles = [role.scope for role in member.roles.all()]
    return scopes[request.method] in member_roles
