from rest_framework import serializers

from core.calls.models import RequestsFilter
from core.users.serializers.users import DefaultUserSerializer


class RequestsFiltersSerializer(serializers.ModelSerializer):
    user = DefaultUserSerializer(many=False, read_only=True)

    class Meta:
        model = RequestsFilter
        exclude = ('project',)


class RequestsFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestsFilter
        fields = '__all__'

    def create(self, validated_data):
        return RequestsFilter.objects.create(**validated_data, **self.context)
