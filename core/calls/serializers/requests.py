from rest_framework import serializers

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
        return Request.objects.create(
            **validated_data,
            user=self.context.get('user'),
            project=self.context.get('project')
        )
