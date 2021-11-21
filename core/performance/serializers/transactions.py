from rest_framework import serializers

from core.performance.models import Transaction


class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        exclude = ('project',)


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

    def create(self, validated_data):
        return Transaction.objects.create(**validated_data, project_id=self.context.get('project_id'))
