from rest_framework import serializers

from core.tracks.models import Service


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ('user', 'project')


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

    def create(self, validated_data):
        return Service.objects.create(
            **validated_data,
            user=self.context.get('user'),
            project=self.context.get('project')
        )
