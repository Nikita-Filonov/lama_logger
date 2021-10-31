from rest_framework import serializers

from core.tracks.models import TrackRequest


class TrackRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackRequest
        exclude = ('id',)
