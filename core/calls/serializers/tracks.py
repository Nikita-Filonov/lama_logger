from rest_framework import serializers

from core.calls.models import Track


class TracksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        exclude = ('user', 'project')


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'

    def create(self, validated_data):
        return Track.objects.create(
            **validated_data,
            user=self.context.get('user'),
            project=self.context.get('project')
        )
