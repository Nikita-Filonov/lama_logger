import json

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.models import Request
from core.calls.serializers.requests import RequestsSerializer
from core.projects.models import Project
from core.stats.tracks.requests import track_requests
from utils.exeptions import BadRequest


class RequestsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        filters = json.loads(request.query_params.get('filters', '{}'))
        print(filters)
        requests = Request.objects.filter(**filters, project_id=project_id).order_by('-created')

        results = self.paginate_queryset(requests, request, view=self)
        serializer = RequestsSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def delete(self, request, project_id):
        requests = request.data
        if not isinstance(requests, list):
            raise BadRequest('You should provide requests ids')

        project = Project.objects.get(id=project_id)
        requests = Request.objects.filter(requestId__in=requests)

        track_requests(project, requests, 'delete')
        requests.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
