import logging

from core.calls.models import Request
from lama_logger.celery import app


@app.task(bind=True)
def clear_requests(self, **kwargs):
    project_id = kwargs.get('project_id', None)
    if project_id is None:
        logging.error('We unable to clear requests without "project_id" set')

    requests = Request.objects.filter(project_id=project_id)
    requests.delete()
