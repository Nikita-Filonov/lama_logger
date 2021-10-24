from rest_framework import serializers

from core.tracks.models import ServiceActivity
from core.tracks.serializers.services import ServicesSerializer


class ServiceActivitiesSerializer(serializers.ModelSerializer):
    services = ServicesSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceActivity
        exclude = ('project',)


class ServiceActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceActivity
        fields = '__all__'

    def create(self, validated_data):
        return ServiceActivity.objects.create(
            **validated_data,
            project=self.context.get('project')
        )
