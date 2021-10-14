import json

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.projects.helpers.utils import to_curl
from core.projects.models import Project, Request
from core.projects.serializers.requests import RequestsSerializer, RequestSerializer
from core.stats.tracks.requests import track_request, track_requests


class RequestsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        filters = json.loads(request.query_params['filters'])
        project = Project.objects.get(id=project_id)
        requests = project.requests.filter(**filters).order_by('-created')

        results = self.paginate_queryset(requests, request, view=self)
        serializer = RequestsSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            created_request = serializer.save()
            created_request.user = request.user
            project.requests.add(created_request)

            track_request(project, created_request, 'create')

            payload = RequestsSerializer(created_request, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, project_id):
        requests = request.data
        if not isinstance(requests, list):
            return Response(
                {'message': 'You should provide requests ids', 'level': 'danger'},
                status=status.HTTP_400_BAD_REQUEST
            )
        project = Project.objects.get(id=project_id)
        requests = project.requests.filter(request_id__in=requests)

        track_requests(project, requests, 'delete')
        requests.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class RequestApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id, request_id):
        db_request = Request.objects.get(request_id=request_id)
        return Response(RequestsSerializer(db_request, many=False).data)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def request_to_curl(request, project_id, request_id):
    db_request = Request.objects.get(request_id=request_id)
    curl_request = {
        'method': db_request.method,
        'headers': db_request.request_headers,
        'body': db_request.request_body,
        'url': db_request.request_url
    }
    return Response({'curl': to_curl(curl_request)})
