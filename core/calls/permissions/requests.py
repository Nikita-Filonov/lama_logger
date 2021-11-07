from rest_framework.permissions import BasePermission

from core.calls.models import Request
from core.projects.models import Project
from core.projects.permissions.utils import to_scope
from utils.exeptions import Forbidden, NotFound


class IsRequestActionAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.calls.models.Request
    """
    SCOPES = to_scope(Project)

    def has_permission(self, request, view):
        try:
            custom_request = Request.objects.get(requestId=view.kwargs['request_id'])
        except Request.DoesNotExist:
            raise NotFound('Request does not exists')

        if request.user == custom_request.user and custom_request.isCustom:
            return True

        raise Forbidden('You do not have access to this request')
