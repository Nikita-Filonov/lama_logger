from django.conf.urls import url

from projects.consumers.requests import RequestsConsumer

websocket_urlpatterns = [
    url(r'projects/(?P<project_id>\w+)/requests/$', RequestsConsumer.as_asgi()),
]
