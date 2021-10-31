import re
import threading

from core.tracks.helpers.analyzers.patterns import get_tracks_patterns
from core.tracks.models import TrackRequest, Track


def analyze_request(project_id: int, payload: dict):
    context = {'project_id': project_id, 'payload': payload}
    thread = threading.Thread(target=analyze, kwargs=context)
    thread.start()


def analyze(project_id: int, payload: dict):
    request_url = payload.get('requestUrl', None)
    status_code = payload.get('statusCode', None)
    payload.pop('requestId', None)

    if request_url is None:
        return

    if status_code is None:
        return

    patterns = get_tracks_patterns(project_id)

    for pattern in patterns:
        if re.match(rf'{pattern["endpoint"]}', request_url):
            track = Track.objects.get(id=pattern['track_id'])
            if status_code in track.statusCodes:
                track_request = TrackRequest.objects.create(**payload)
                track.requests.add(track_request)

                track.timesActual = track.timesActual + 1
                track.save()
