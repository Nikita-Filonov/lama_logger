from rest_framework import serializers

from core.stats.models import RequestStat


class RequestsStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestStat
        exclude = ('project',)
