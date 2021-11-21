import json

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.performance.models import Transaction
from core.performance.serializers.transactions import TransactionSerializer, TransactionsSerializer
from utils.exeptions import BadRequest


class TransactionsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        filters = json.loads(request.query_params.get('filters', '{}'))
        requests = Transaction.objects.filter(**filters, project_id=project_id).order_by('-created')

        results = self.paginate_queryset(requests, request, view=self)
        serializer = TransactionsSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request, project_id):
        context = {'project_id': project_id}
        serializer = TransactionSerializer(data=request.data, context=context)
        if serializer.is_valid():
            transaction = serializer.save()
            serializer = TransactionsSerializer(transaction, many=False)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise BadRequest(message='Error happened while creating transaction', data=serializer.errors)
