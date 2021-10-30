from lama_logger.celery import app


@app.task(bind=True)
def clear_requests(self, **kwargs):
    pass
