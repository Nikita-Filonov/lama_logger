import json
from itertools import groupby
from typing import List, Dict, Union, Tuple

from django.db.models import QuerySet

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
    labels, status_codes = [groupby(requests_stats, key=group_type['func']) for _ in range(2)]
    return {
        'labels': [created.strftime(group_type['format']) for created, _ in labels],
        'datasets': [
            {
                'spanGaps': True,
                'label': 'Status codes',
                'data': [len(list(stats)) for _, stats in status_codes],
                'backgroundColor': 'rgb(255, 99, 132)',
                'borderColor': "#FF6384",
            },
        ]
    }


def filter_action(action: str, stats: List[RequestStat]) -> int:
    """
    Used to filter list of RequestStat's, by their action type.

    Example:

    filter_action('create', [RequestStat('create'), RequestStat('delete')]) -> [RequestStat('create'))]
    """
    return len(list(filter(lambda s: s.action == action, stats)))


def by_hours(entity):
    """
    Used to group stat by hours.

    For example, if state was created at 2022.10.14 12:15:54,
    then output of this function will be following:

    group_by_date('2022.10.14 12:15.54') -> 2022.10.14 12:00:00
    """
    return entity.created.replace(minute=0, second=0, microsecond=0)


def by_days(entity):
    """
    Used to group stat by days.

    For example, if state was created at 2022.10.14 12:15:54,
    then output of this function will be following:

    group_by_date('2022.10.14 12:15.54') -> 2022.10.14 00:00:00
    """
    return entity.created.replace(hour=0, minute=0, second=0, microsecond=0)


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
