from rest_framework import serializers

from core.tracks.models import ServiceActivity


class ServiceActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceActivity
        exclude = ('project',)


class ServiceActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceActivity
        fields = '__all__'
