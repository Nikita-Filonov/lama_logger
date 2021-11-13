import json
from itertools import groupby
from typing import List, Dict, Union, Tuple

from django.db.models import QuerySet

from core.stats.helper.statistics.utils import group_types, filter_action, count_status_codes, get_averages
from core.stats.models import RequestStat


def group_to_stats(request, project_id) -> Tuple:
    """
    Combining the same actions for grouping data for chart
    """
    filters = json.loads(request.query_params.get('filters', '{}'))  # date time, issue type, method
    group_by = request.query_params.get('groupBy', 'hours')

    requests_stats = RequestStat.objects.filter(project_id=project_id, **filters).order_by('created')
    group_type = group_types[group_by]
    return requests_stats, group_type


def to_stats_payload(requests_stats: QuerySet[RequestStat], group_type) -> \
        Dict[str, Union[list, List[Dict[str, Union[bool, str, List[int]]]]]]:
    """
    Common reason why we need this method - itertools.groupby let us
    read iterable object only once. So we have to save this object
    in some variable, in our case "stats", and this we can filter.
    """
    labels, created, filtered, removed = [groupby(requests_stats, key=group_type['func']) for _ in range(4)]
    return {
        'labels': [created.strftime(group_type['format']) for created, _ in labels],
        'datasets': [
            {
                'spanGaps': True,
                'label': 'Created',
                'data': [filter_action('create', list(stats)) for _, stats in created],
                'backgroundColor': 'rgb(255, 99, 132)',
            },
            {
                'spanGaps': True,
                'label': 'Filtered',
                'data': [filter_action('filter', list(stats)) for _, stats in filtered],
                'backgroundColor': 'rgb(54, 162, 235)',
            },
            {
                'spanGaps': True,
                'label': 'Removed',
                'data': [filter_action('delete', list(stats)) for _, stats in removed],
                'backgroundColor': 'rgb(75, 192, 192)',
            },
        ]
    }


def to_ratio_status_codes_payload(requests_stats: QuerySet[RequestStat], group_type):
    labels, five, four, three, two = [groupby(requests_stats, key=group_type['func']) for _ in range(5)]
    return {
        'labels': [created.strftime(group_type['format']) for created, _ in labels],
        'datasets': [
            {
                'spanGaps': True,
                'label': '5XX',
                'data': count_status_codes(500, 599, five),
                'borderColor': '#E40F08',
                'backgroundColor': '#E40F08',
            },
            {
                'spanGaps': True,
                'label': '4XX',
                'data': count_status_codes(400, 499, four),
                'borderColor': '#CF9800',
                'backgroundColor': '#CF9800',
            },
            {
                'spanGaps': True,
                'label': '3XX',
                'data': count_status_codes(300, 399, three),
                'borderColor': '#FFBD00',
                'backgroundColor': '#FFBD00',
            },
            {
                'spanGaps': True,
                'label': '2XX',
                'data': count_status_codes(200, 299, two),
                'borderColor': '#02C001',
                'backgroundColor': '#02C001',
            },
        ]
    }


def to_response_time_payload(requests_stats: QuerySet[RequestStat], group_type):
    labels, average, _max, _min = [groupby(requests_stats, key=group_type['func']) for _ in range(4)]

    return {
        'labels': [created.strftime(group_type['format']) for created, _ in labels],
        'datasets': [
            {
                'spanGaps': True,
                'label': 'Average',
                'data': get_averages('average', average),
                'borderColor': '#FFBD00',
                'backgroundColor': '#FFBD00',
            },
            {
                'spanGaps': True,
                'label': 'Min',
                'data': get_averages('min', _min),
                'borderColor': '#02C001',
                'backgroundColor': '#02C001',
            },
            {
                'spanGaps': True,
                'label': 'Max',
                'data': get_averages('max', _max),
                'borderColor': '#E40F08',
                'backgroundColor': '#E40F08',
            }
        ]
    }
