from rest_framework.permissions import BasePermission

from core.projects.models import Project, Member, Role, ProjectSettings, ProjectTask
from core.projects.permissions.utils import to_scope, common_check, to_forbid_message
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


class IsMemberActionAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Member
    """
    SCOPES = to_scope(Member)

    def has_permission(self, request, view):
        is_allowed = common_check(view, request, self.SCOPES)

        if is_allowed:
            return True

        raise Forbidden(to_forbid_message(request.method, Member))


class IsRoleActionAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Member
    """
    SCOPES = to_scope(Role)

    def has_permission(self, request, view):
        is_allowed = common_check(view, request, self.SCOPES)

        if is_allowed:
            return True

        raise Forbidden(to_forbid_message(request.method, Role))


class IsProjectSettingsActionAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Member
    """
    SCOPES = to_scope(ProjectSettings)

    def has_permission(self, request, view):
        is_allowed = common_check(view, request, self.SCOPES)

        if is_allowed:
            return True

        raise Forbidden(to_forbid_message(request.method, ProjectSettings))


class IsProjectTaskActionAllowed(BasePermission):
    """
    Allows access only if user has permissions for core.projects.models.Member
    """
    SCOPES = to_scope(ProjectTask)

    def has_permission(self, request, view):
        is_allowed = common_check(view, request, self.SCOPES)

        if is_allowed:
            return True

        raise Forbidden(to_forbid_message(request.method, ProjectTask))
