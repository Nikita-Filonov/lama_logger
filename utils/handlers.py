from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response

from utils.exeptions import COMMON_STATUSES, COMMON_EXCEPTIONS, APIException


def exception_handler(exc, context):
    if not hasattr(exc, 'status_code') and not settings.DEBUG:
        return Response({**COMMON_EXCEPTIONS[500], 'data': str(exc)}, status=500)

    if isinstance(exc, ObjectDoesNotExist):
        return Response({**COMMON_EXCEPTIONS[404], 'data': str(exc)}, status=404)

    if isinstance(exc, APIException):
        return Response({'message': exc.message, 'level': exc.level, 'data': exc.data}, status=exc.status_code)

    if exc.status_code in COMMON_STATUSES:
        exception = COMMON_EXCEPTIONS[exc.status_code]
        return Response(exception, status=exc.status_code)

    return
