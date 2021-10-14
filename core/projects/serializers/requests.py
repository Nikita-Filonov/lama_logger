from rest_framework import serializers

from core.projects.models import Request


class RequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        exclude = ('user', 'id')


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'