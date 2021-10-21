from rest_framework.exceptions import APIException

ERROR = 'error'
WARNING = 'warning'
SUCCESS = 'success'
PRIMARY = 'primary'


class BadRequest(APIException):
    status_code = 400
    default_detail = None
    detail = None
    message = 'Bad request'
    level = 'error'

    def __init__(self, message: str, level: str = ERROR):
        self.message = message
        self.level = level


class NotFound(APIException):
    status_code = 404
    default_detail = None
    detail = None
    message = 'Not found'
    level = 'error'

    def __init__(self, message: str, level: str = ERROR):
        self.message = message
        self.level = level


COMMON_STATUSES = [401, 405, 500, 404]
COMMON_EXCEPTIONS = {
    401: {
        'message': 'You are not authenticated. Please log in',
        'level': ERROR
    },
    405: {
        'message': 'Such method not allowed',
        'level': ERROR
    },
    500: {
        'message': 'Server error. Please try refresh the page',
        'level': ERROR
    },
    404: {
        'message': 'Resource was not find on the server',
        'level': ERROR
    },
    400: {
        'message': 'Bad request. Make sure to all fields correct',
        'level': ERROR
    }
}
