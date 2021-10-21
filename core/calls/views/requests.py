import json

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.helpers.requests.authenticators import IntegrationTokenAuthentication
from core.calls.helpers.requests.filters import filter_request
from core.calls.models import Request
from core.calls.serializers.requests import RequestsSerializer, RequestSerializer
from core.projects.helpers.utils import to_curl
from core.projects.models import Project
from core.stats.tracks.requests import track_request, track_requests
from utils.exeptions import BadRequest


@api_view(['POST'])
@authentication_classes((IntegrationTokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def create_request(request, project_id):
    project = Project.objects.get(id=project_id)

    should_create_request = filter_request(project, request.data)
    if not should_create_request:
        return Response(status=status.HTTP_204_NO_CONTENT)

    context = {'user': request.user, 'project': project}
    serializer = RequestSerializer(data=request.data, context=context)
    if serializer.is_valid():
        created_request = serializer.save()
        track_request(project, created_request, 'create')

        payload = RequestsSerializer(created_request, many=False).data
        return Response(payload, status=status.HTTP_201_CREATED)

    raise BadRequest('Error happened while creating request')


class RequestsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        filters = json.loads(request.query_params.get('filters', '{}'))
        search = json.loads(request.query_params.get('search', '{}'))

        requests = Request.objects.filter(**filters,
                                          project_id=project_id,
                                          requestUrl__icontains=search.get('requestUrl', '')).order_by('-created')

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


class RequestApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id, request_id):
        db_request = Request.objects.get(requestId=request_id)
        return Response(RequestsSerializer(db_request, many=False).data)

    def delete(self, request, project_id, request_id):
        try:
            request = Request.objects.get(requestId=request_id)
        except Request.DoesNotExist:
            return Response(
                {'message': 'Request does not exists', 'level': 'error'},
                status=status.HTTP_404_NOT_FOUND
            )

        request.delete()
        return Response({'message': 'Request was successfully deleted', 'level': 'success'})


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def request_to_curl(request, project_id, request_id):
    db_request = Request.objects.get(requestId=request_id)
    curl_request = {
        'method': db_request.method,
        'headers': db_request.requestHeaders,
        'body': db_request.requestBody,
        'url': db_request.requestUrl
    }
    return Response({'curl': to_curl(curl_request)})
