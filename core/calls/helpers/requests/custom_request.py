from requests import request as lib_request

from core.calls.helpers.utils import to_header_payload
from core.calls.models import Request
from core.calls.serializers.requests import RequestsSerializer
from utils.exeptions import BadRequest


def send_custom_request(request: Request):
    if request.requestUrl is None:
        raise BadRequest('We could not send request without url', level='warning')

    options = {
        'data': request.requestBody,
        'headers': {
            header['key']: header['value'] for header in request.requestHeaders
            if (header.get('key') or header.get('value')) and header.get('include')
        }
    }

    try:
        response = lib_request(request.method, request.requestUrl, **options)
    except Exception as error:
        raise BadRequest('Error happened while sending request', level='warning', data=str(error))

    serializer = RequestsSerializer(request, many=False)
    return {
        **serializer.data,
        'responseHeaders': to_header_payload(response.headers),
        'responseBody': response.text,
        'statusCode': response.status_code,
        'duration': response.elapsed.total_seconds()
    }
