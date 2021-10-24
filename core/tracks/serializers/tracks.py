from rest_framework import serializers

from core.tracks.models import Track


class TracksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        exclude = ('user',)


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'

    def create(self, validated_data):
        return Track.objects.create(**validated_data, user=self.context.get('user'))
