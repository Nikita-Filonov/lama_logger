import uuid
from itertools import groupby

from django.utils import timezone
from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.models import CustomRequestsHistory
from core.calls.serializers.custom_requests_history import CustomRequestsHistoriesSerializer, \
    CustomRequestsHistorySerializer
from core.projects.models import Project
from core.stats.helper.utils import group_types
from utils.exeptions import BadRequest


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
                'id': uuid.uuid4(),
                'created': created,
                'data': CustomRequestsHistoriesSerializer(histories, many=True).data
            }
            for created, histories in groupby(results, key=group_type['func'])
        ]

        return self.get_paginated_response(grouped_results)

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        context = {'user': request.user, 'project': project}
        serializer = CustomRequestsHistorySerializer(data=request.data, context=context)
        if serializer.is_valid():
            history: CustomRequestsHistory = serializer.save()
            history.created = timezone.now()
            history.save()

            payload = CustomRequestsHistoriesSerializer(history, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while saving requests history', data=serializer.errors)
