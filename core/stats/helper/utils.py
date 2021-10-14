from typing import List

from core.stats.models import RequestStat


def to_stats_payload(grouped_stats):
    """
    Common reason why we need this method - itertools.groupby let us
    read iterable object only once. So we have to save this object
    in some variable, in our case "stats", and this we can filter.
    """
    stats = list(grouped_stats)
    return {
        'Create': filter_action('create', stats),
        'Delete': filter_action('delete', stats),
        'Filter': filter_action('filter', stats),
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
