from rest_framework import serializers

from core.tracks.models import Service
from core.tracks.serializers.tracks import TracksSerializer


class ServicesSerializer(serializers.ModelSerializer):
    tracks = TracksSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
