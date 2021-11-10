import json

from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, throttle_classes, authentication_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.helpers.requests.custom_request import send_custom_request
from core.calls.models import Request
from core.calls.permissions.requests import IsRequestActionAllowed
from core.calls.serializers.requests import RequestsSerializer, RequestSerializer
from core.projects.models import Project
from utils.exeptions import BadRequest, NotFound


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

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        context = {'user': request.user, 'project': project}
        serializer = RequestSerializer(data=request.data, context=context)
        if serializer.is_valid():
            created_request = serializer.save()

            payload = RequestsSerializer(created_request, many=False).data
            return Response(payload, status=status.HTTP_201_CREATED)

        raise BadRequest('Error happened while creating request')


class CustomRequestApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsRequestActionAllowed]
    throttle_classes = [UserRateThrottle]

    def patch(self, request, project_id, request_id):
        custom_request = Request.objects.get(requestId=request_id)
        serializer = RequestSerializer(custom_request, data=request.data, partial=True)

        if serializer.is_valid():
            custom_request = serializer.save()
            serializer = RequestsSerializer(custom_request, many=False)
            return Response(serializer.data)

        raise BadRequest(message='Error happened while updating request', data=serializer.errors)

    def delete(self, request, project_id, request_id):
        request = Request.objects.get(requestId=request_id)
        request.delete()
        return Response({'message': 'Request was successfully deleted', 'level': 'success'})


@api_view(['POST'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def custom_request_send(request, project_id, request_id):
    try:
        request = Request.objects.get(requestId=request_id)
    except Request.DoesNotExist:
        raise NotFound('Custom request does not exists')

    response = send_custom_request(request)
    return Response(response)
