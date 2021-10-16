# Filter out events coming from localhost

# IP Addresses
# Filter events from these IP addresses. Separate multiple entries with a newline

# Error Message
# Filter events by error messages. Separate multiple entries with a newline. Allows glob pattern matching.


from core.projects.models import Project, ProjectSettings
from core.stats.models import RequestStat


def filter_request(project: Project, payload: dict):
    track_stat = RequestStat.objects.create
    settings = ProjectSettings.objects.get(project=project)
    stat_payload = {
        'method': payload['method'],
        'response_code': payload['response_code'],
        'project': project,
        'action': 'filter'
    }

    if payload['method'] in settings.excludeMethods:
        track_stat(**stat_payload)
        return

    if payload['response_code'] in settings.excludeStatuses:
        track_stat(**stat_payload)
        return

    return payload
