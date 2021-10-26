from django.db.models import Max
from rest_framework import serializers

from core.tracks.helpers.utils import to_max_index
from core.tracks.models import ServiceActivity
from core.tracks.serializers.services import ServicesSerializer


class ServiceActivitiesSerializer(serializers.ModelSerializer):
    services = ServicesSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceActivity
        exclude = ('project',)


class ServiceActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceActivity
        fields = '__all__'

    def create(self, validated_data):
        project = self.context.get('project')
        max_index = ServiceActivity.objects.filter(project=project).aggregate(Max('index'))['index__max']

        new_index = to_max_index(max_index)

        return ServiceActivity.objects.create(
            **validated_data,
            project=self.context.get('project'),
            index=new_index
        )
