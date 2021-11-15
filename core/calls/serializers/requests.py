from rest_framework import serializers

from core.calls.helpers.utils import to_header_payload
from core.calls.models import Request


class RequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        exclude = ('user', 'project', 'id')


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'

    def create(self, validated_data):
        request_headers = validated_data.pop('requestHeaders', {})
        query_params = validated_data.pop('queryParams', {})
        response_headers = validated_data.pop('responseHeaders', {})

        return Request.objects.create(
            **validated_data,
            user=self.context.get('user'),
            project=self.context.get('project'),
            queryParams=to_header_payload(query_params),
            requestHeaders=to_header_payload(request_headers),
            responseHeaders=to_header_payload(response_headers)
        )


class CustomRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'

    def create(self, validated_data):
        return Request.objects.create(
            **validated_data,
            user=self.context.get('user'),
            project=self.context.get('project')
        )
