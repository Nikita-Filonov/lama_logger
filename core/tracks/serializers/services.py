from rest_framework import serializers

from core.tracks.models import Service


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
