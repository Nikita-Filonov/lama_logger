from rest_framework.permissions import BasePermission

from core.calls.models import Request, RequestsFilter
from core.projects.permissions.utils import to_scope, common_check, to_forbid_message
from utils.exeptions import Forbidden


class IsRequestAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Member
    """
    SCOPES = to_scope(Request)

    def has_permission(self, request, view):
        is_allowed = common_check(view, request, self.SCOPES)

        if is_allowed:
            return True

        raise Forbidden(to_forbid_message(request.method, Request))


class IsRequestsFilterAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Member
    """
    SCOPES = to_scope(RequestsFilter)

    def has_permission(self, request, view):
        is_allowed = common_check(view, request, self.SCOPES)

        if is_allowed:
            return True

        raise Forbidden(to_forbid_message(request.method, RequestsFilter))
