import json

from rest_framework import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle

from core.calls.models import Request
from core.calls.serializers.requests import RequestsSerializer


class CustomRequestsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        filters = json.loads(request.query_params.get('filters', '{}'))
        requests = Request.objects.filter(**filters, project_id=project_id, user=request.user).order_by('-created')

        results = self.paginate_queryset(requests, request, view=self)
        serializer = RequestsSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def delete(self, request, project_id):
        pass
