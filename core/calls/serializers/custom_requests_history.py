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

    def create(self, validated_data):
        return CustomRequestsHistory.objects.create(
            **validated_data,
            user=self.context.get('user'),
            project=self.context.get('project')
        )
