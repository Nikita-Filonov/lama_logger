from rest_framework import serializers

from projects.models import Request


class RequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        exclude = ('user',)


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'
