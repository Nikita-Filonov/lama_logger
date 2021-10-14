import json
from itertools import groupby

from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.stats.helper.utils import by_hours, by_days, filter_action
from core.stats.models import RequestStat

group_types = {
    'hours': {
        'func': by_hours,
        'format': '%b %d, %H:%M'
    },
    'days': {
        'func': by_days,
        'format': '%b %d'
    }
}


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
            'Created': filter_action('create', grouped_stats),
            'Delete': filter_action('delete', grouped_stats),
            'Filter': filter_action('filter', grouped_stats),
        }
        for created, grouped_stats in groupby(requests_stats, key=group_type['func'])
    ]

    payload = {
        'create': create_count,
        'delete': delete_count,
        'filter': filter_count,
        'data': grouped_stats_payload
    }
    return Response(payload)
