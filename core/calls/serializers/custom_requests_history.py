from rest_framework import serializers

from core.calls.models import CustomRequestsHistory


class CustomRequestsHistoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomRequestsHistory
        exclude = ('project', 'user')


class CustomRequestsHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomRequestsHistory
        fields = '__all__'
