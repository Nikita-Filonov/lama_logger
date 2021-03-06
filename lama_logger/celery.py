import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lama_logger.settings.server')
app = Celery('lama_logger', broker=settings.CELERY_RESULT_BACKEND)
app.config_from_object('django.conf:settings')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
