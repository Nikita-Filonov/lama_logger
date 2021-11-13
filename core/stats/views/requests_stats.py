import json
from itertools import groupby

from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.stats.helper.utils import group_types, to_stats_payload
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

    payload = {
        'total': requests_stats.count(),
        'create': create_count,
        'delete': delete_count,
        'filter': filter_count,
        'data': to_stats_payload(requests_stats, group_type)
    }
    return Response(payload)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def get_ratio_status_codes(request, project_id):
    filters = json.loads(request.query_params.get('filters', '{}'))  # date time, issue type, method
    group_by = request.query_params.get('groupBy', 'hours')

    requests_stats = RequestStat.objects.filter(project_id=project_id, **filters).order_by('created')

    group_type = group_types[group_by]

    # TODO привести в порядок весь код
    labels, status_codes = [groupby(requests_stats, key=group_type['func']) for _ in range(2)]
    payload = {
        'labels': [created.strftime(group_type['format']) for created, _ in labels],
        'datasets': [
            {
                'spanGaps': True,
                'label': 'Status codes',
                'data': [len(list(stats)) for _, stats in status_codes],
                'backgroundColor': 'rgb(255, 99, 132)',
            },
        ]
    }
    return Response(payload)
