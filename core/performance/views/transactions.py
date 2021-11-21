from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.performance.serializers.transactions import TransactionSerializer, TransactionsSerializer
from utils.exeptions import BadRequest


class TransactionsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        pass

    def post(self, request, project_id):
        context = {'project_id': project_id}
        serializer = TransactionSerializer(data=request.data, context=context)
        if serializer.is_valid():
            transaction = serializer.save()
            serializer = TransactionsSerializer(transaction, many=False)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise BadRequest(message='Error happened while creating transaction', data=serializer.errors)
