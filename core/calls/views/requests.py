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
from core.projects.models import Project
from core.stats.tracks.requests import track_request, track_requests
from core.tracks.helpers.analyzers.analyze_request import analyze_request
from utils.exeptions import BadRequest, NotFound
from utils.helpers.common import delete_model


@api_view(['POST'])
@authentication_classes((IntegrationTokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def create_request(request, project_id):
    project = Project.objects.get(id=project_id)

    analyze_request(project_id, request.data)
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


@api_view(['DELETE'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def delete_all_requests(request, project_id):
    requests = Request.objects.filter(project_id=project_id)
    requests.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def get_requests_chain(request, project_id, node_id):
    requests = Request.objects.filter(project_id=project_id, nodeId=node_id).order_by('created')
    serializer = RequestsSerializer(requests, many=True)
    return Response(serializer.data)


class RequestsApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        filters = json.loads(request.query_params.get('filters', '{}'))
        requests = Request.objects.filter(**filters, project_id=project_id).order_by('-created')

        results = self.paginate_queryset(requests, request, view=self)
        serializer = RequestsSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def delete(self, request, project_id):
        requests = request.data
        if not isinstance(requests, list):
            raise BadRequest('You should provide requests ids')

        project = Project.objects.get(id=project_id)
        requests = Request.objects.filter(project_id=project_id, requestId__in=requests)

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

    def patch(self, request, project_id, request_id):
        try:
            custom_request = Request.objects.get(requestId=request_id, isCustom=False)
        except Request.DoesNotExist:
            raise NotFound('Request not found')

        serializer = RequestSerializer(custom_request, data=request.data, partial=True)

        if serializer.is_valid():
            custom_request = serializer.save()
            serializer = RequestsSerializer(custom_request, many=False)
            return Response(serializer.data)

        raise BadRequest(message='Error happened while updating request', data=serializer.errors)

    def delete(self, request, project_id, request_id):
        delete_model(Request, requestId=request_id)
        return Response({'message': 'Request was successfully deleted', 'level': 'success'})
