from rest_framework import serializers

from core.users.models import ApiToken


class ApiTokensSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiToken
        exclude = ('token', 'user', 'deleted')


class ApiTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiToken
        fields = '__all__'

    def create(self, validated_data):
        return ApiToken.objects.create(**validated_data, user=self.context)
