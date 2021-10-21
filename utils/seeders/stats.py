"""
python manage.py shell < ./utils/seeders/stats.py
"""

import logging
import os
import random
from datetime import datetime

from core.stats.models import RequestStat
from utils.seeders.utils import METHODS, random_date, ACTIONS


def seed_stats():
    project_id = os.environ.get('PROJECT_ID', 1)
    start = datetime.strptime('1/10/2021 1:30 PM', '%d/%m/%Y %I:%M %p')
    end = datetime.strptime('21/10/2021 1:30 PM', '%d/%m/%Y %I:%M %p')
    payload = [{
        'method': random.choice(METHODS),
        'statusCode': random.randint(200, 504),
        'created': random_date(start, end),
        'action': random.choice(ACTIONS),
        'project_id': project_id
    } for _ in range(1000)]
    for stat in payload:
        try:
            logging.info(f'Creating stats with payload {stat}')
            RequestStat.objects.create(**stat)
        except Exception as error:
            logging.error(error)


seed_stats()
