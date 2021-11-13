from datetime import datetime
from statistics import mean
from typing import List, Tuple

from core.stats.models import RequestStat


def filter_action(action: str, stats: List[RequestStat]) -> int:
    """
    Used to filter list of RequestStat's, by their action type.

    Example:

    filter_action('create', [RequestStat('create'), RequestStat('delete')]) -> [RequestStat('create'))]
    """
    return len(list(filter(lambda s: s.action == action, stats)))


def count_status_codes(start: int, end: int, stats: Tuple[datetime, List[RequestStat]]):
    """
    :param start: integer status code, for example 500
    :param end: integer status code, for example 599
    :param stats: tuple of grouped ``RequestStat``
    :return:

    Will count number of status codes for list of ``RequestStat``
    """
    return [
        # after converting filter object to list we getting len of that list
        len(
            # because filter returns an filter object, we have to convert that object to list
            list(
                # filtering only status codes which satisfy our start, end range
                filter(lambda stat: start <= stat.statusCode <= end, list(stats))
            )
        )
        for _, stats in stats
    ]


def get_averages(convert_type: str, stats: Tuple[datetime, List[RequestStat]]):
    """
    :param convert_type: one of supported converting type: {'min': min, 'max': max, 'average': mean}
    :param stats: tuple of grouped ``RequestStat``
    :return:
    """
    supported_types = {'min': min, 'max': max, 'average': mean}
    to = supported_types[convert_type]
    return [
        # getting min/max/average value
        to(
            # because map returns map object, we have to convert it to list
            list(
                # getting only durations from RequestStat
                map(lambda s: s.duration, stats)
            )
        ) * 1000  # converting seconds to milliseconds
        for _, stats in stats
    ]


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


def by_month(entity):
    """
        Used to group stat by days.

        For example, if state was created at 2022.10.14 12:15:54,
        then output of this function will be following:

        group_by_date('2022.10.14 12:15.54') -> 2022.10.14 00:00:00
        """


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
