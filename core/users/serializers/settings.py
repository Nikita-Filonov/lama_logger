from rest_framework import serializers

from core.users.models import UserSettings


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        exclude = ('user',)


class UserSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = '__all__'
