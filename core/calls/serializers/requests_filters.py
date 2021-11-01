from rest_framework import serializers

from core.calls.models import RequestsFilter


class RequestsFiltersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestsFilter
        exclude = ('project', 'user')


class RequestsFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestsFilter
        fields = '__all__'

    def create(self, validated_data):
        return RequestsFilter.objects.create(**validated_data, **self.context)
