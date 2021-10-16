import json
from itertools import groupby

from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.stats.helper.utils import by_hours, by_days, to_stats_payload, group_types
from core.stats.models import RequestStat


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def get_requests_stats(request, project_id):
    filters = json.loads(request.query_params.get('filters', '{}'))  # date time, issue type, method
    group_by = request.query_params.get('groupBy', 'hours')

    requests_stats = RequestStat.objects.filter(project_id=project_id, **filters).order_by('created')
    create_count = requests_stats.filter(action='create').count()
    delete_count = requests_stats.filter(action='delete').count()
    filter_count = requests_stats.filter(action='filter').count()

    group_type = group_types[group_by]
    grouped_stats_payload = [
        {
            'name': created.strftime(group_type['format']),
            **to_stats_payload(grouped_stats)
        }
        for created, grouped_stats in groupby(requests_stats, key=group_type['func'])
    ]

    payload = {
        'total': requests_stats.count(),
        'create': create_count,
        'delete': delete_count,
        'filter': filter_count,
        'data': grouped_stats_payload
    }
    return Response(payload)
