import json

from django.core.serializers.json import DjangoJSONEncoder


def to_backup(payload):
    """
    :param payload:
    :return:
    """
    return json.loads(json.dumps(
        payload,
        indent=1,
        sort_keys=True,
        cls=DjangoJSONEncoder
    ))
