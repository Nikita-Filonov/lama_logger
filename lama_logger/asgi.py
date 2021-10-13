"""
ASGI config for lama_logger project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

import django

DEBUG = True
# DEBUG - False for production
# True - for local development

if DEBUG:
    import core.projects.routing
    from channels.auth import AuthMiddlewareStack
    from channels.routing import ProtocolTypeRouter, URLRouter

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lama_logger.settings.local")

    application = ProtocolTypeRouter({
        "websocket": AuthMiddlewareStack(
            URLRouter(
                core.projects.routing.websocket_urlpatterns
            )
        ),
    })
else:
    from channels.routing import get_default_application

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lama_logger.settings.server')
    django.setup()
    application = get_default_application()
