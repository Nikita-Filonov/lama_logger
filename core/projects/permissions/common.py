from rest_framework.permissions import BasePermission

from core.projects.models import Project
from core.projects.permissions.utils import to_scope, common_check


class IsProjectActionAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Project
    """
    SCOPES = to_scope(Project)

    def has_permission(self, request, view):
        return common_check(view, request, self.SCOPES)
