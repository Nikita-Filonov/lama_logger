from rest_framework.permissions import BasePermission

from core.projects.models import Project
from core.projects.permissions.utils import to_scope, common_check
from utils.exeptions import Forbidden


class IsProjectActionAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Project
    """
    SCOPES = to_scope(Project)

    def has_permission(self, request, view):
        is_allowed = common_check(view, request, self.SCOPES)

        if is_allowed:
            return True

        raise Forbidden('You do not have access to this project')
