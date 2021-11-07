from itertools import groupby

from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle

from core.calls.models import CustomRequestsHistory
from core.calls.serializers.custom_requests_history import CustomRequestsHistoriesSerializer
from core.stats.helper.utils import group_types


class CustomRequestsHistoryApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        history = CustomRequestsHistory.objects.filter(project_id=project_id, user=request.user).order_by('-created')
        results = self.paginate_queryset(history, request, view=self)

        group_type = group_types['days']
        grouped_results = [
            {
                'created': created,
                'data': CustomRequestsHistoriesSerializer(histories, many=True).data
            }
            for created, histories in groupby(results, key=group_type['func'])
        ]

        return self.get_paginated_response(grouped_results)

    def post(self, request, project_id):
        pass
