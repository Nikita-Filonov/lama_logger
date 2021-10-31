import re
from typing import Dict, List, Any

from core.projects.models import ProjectSettings
from core.tracks.models import Track


def normalize_endpoint(text: str, patterns: Dict[str, str] = None):
    """
    :param text: Any text with patterns. For example http://localhost:8000/api/v1/projects/{int}/
    :param patterns: Dictionary of patterns, where key is pattern (for example "{int}") and
    value in regex expression.
    :return:

    Can be used to replace all ``text`` patterns with regex expressions.

    Example:
    patterns = {
        '{int}': r'[0-9]+',
        '{str}': r'([^>]*)'
    }
    endpoint = 'http://localhost:8000/api/v1/projects/{int}/some/{int}/'

    normalize_endpoint(endpoint, patterns) -> 'http://localhost:8000/api/v1/projects/[0-9]+/some/[0-9]+/'

    Then result can be used in any regex function.
    """
    safe_patterns = patterns or []
    replacement = dict((re.escape(k), v) for k, v in safe_patterns.items())
    pattern = re.compile("|".join(replacement.keys()))
    return pattern.sub(lambda m: replacement[re.escape(m.group(0))], text)


def get_settings_patterns(project_id: int) -> Dict[str, str]:
    """Returning project patterns settings"""
    settings = ProjectSettings.objects.get(project_id=project_id)
    return settings.trackPatterns


def get_tracks_patterns(project_id: int) -> List[Dict[str, Any]]:
    """Retuning all tracks of project with normalized endpoint"""
    settings_patterns = get_settings_patterns(project_id)
    tracks = Track.objects.filter(service__serviceactivity__project_id=project_id)
    return [
        {'track_id': track.id, 'endpoint': normalize_endpoint(track.endpoint, settings_patterns)}
        for track in tracks
    ]
