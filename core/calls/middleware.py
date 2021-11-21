import time

from django.core.handlers.wsgi import WSGIRequest


class ActiveUserMiddleware:
    project_id = 1
    endpoint = f'http://localhost:8000/api/v1/{project_id}/performance/'
    headers = {
        'Authorization': 'Token 2c5b39219e5e15aca9e10fdd0d23cbca10d4d164'
    }

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: WSGIRequest):
        duration = time.time()  # Calculated execution time.
        response = self.get_response(request)  # Get response from view function.
        duration = int((time.time() - duration) * 1000)
        payload = {
            'method': request.method,
            'duration': duration,
            'requestUrl': request.get_full_path(),
            'remoteAddress': self.get_client_ip(request),
            'statusCode': response.status_code
        }
        # post(self.endpoint, json=payload, headers=self.headers)
        return response

    # get clients ip address
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            _ip = x_forwarded_for.split(',')[0]
        else:
            _ip = request.META.get('REMOTE_ADDR')
        return _ip
