from django.db.models import Max
from rest_framework import serializers

from core.tracks.helpers.utils import to_max_index
from core.tracks.models import Service, ServiceActivity
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

    def create(self, validated_data):
        activity: ServiceActivity = self.context['activity']
        max_index = activity.services.all().aggregate(Max('index'))['index__max']

        new_index = to_max_index(max_index)

        service = Service.objects.create(**validated_data, index=new_index)
        activity.services.add(service)
        return service
