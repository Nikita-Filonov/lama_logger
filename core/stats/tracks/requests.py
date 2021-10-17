from typing import List

from core.calls.models import Request
from core.projects.models import Project
from core.stats.models import RequestStat


def track_request(project: Project, request: Request = None, action: str = 'create'):
    """
    Used to track action for single request
    """
    RequestStat.objects.create(
        response_code=request.statusCode,
        method=request.method,
        action=action,
        project=project
    )


def track_requests(project: Project, requests: List[Request] = None, action: str = 'create'):
    """
    Used to track action for multiple requests
    """
    for request in requests:
        RequestStat.objects.create(
            response_code=request.statusCode,
            method=request.method,
            action=action,
            project=project
        )
