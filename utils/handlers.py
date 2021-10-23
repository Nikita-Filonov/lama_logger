from rest_framework.response import Response

from utils.exeptions import COMMON_STATUSES, COMMON_EXCEPTIONS, APIException


def exception_handler(exc, context):
    if not hasattr(exc, 'status_code'):
        return Response({**COMMON_EXCEPTIONS[500], 'data': str(exc)}, status=500)

    if exc.status_code in COMMON_STATUSES:
        exception = COMMON_EXCEPTIONS[exc.status_code]
        return Response(exception, status=exc.status_code)

    if isinstance(exc, APIException):
        return Response({'message': exc.message, 'level': exc.level}, status=exc.status_code)

    return Response({})
