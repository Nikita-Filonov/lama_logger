from rest_framework import serializers

from core.calls.models import CustomRequest


class CustomRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomRequest
        exclude = ('user',)


class CustomRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomRequest
        fields = '__all__'
