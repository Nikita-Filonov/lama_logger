from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from projects.helpers.utils import to_curl
from projects.models import Project, Request
from projects.serializers.requests import RequestsSerializer, RequestSerializer

channel_layer = get_channel_layer()


class RequestsApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        project = Project.objects.get(id=project_id)
        requests = project.requests.all().order_by('-created')
        return Response(RequestsSerializer(requests, many=True).data)

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            created_request = serializer.save()
            created_request.user = request.user
            project.requests.add(created_request)

            payload = RequestsSerializer(created_request, many=False).data

            json_notification = {'type': 'send_request', 'payload': payload}
            async_to_sync(channel_layer.group_send)(str(project.id), json_notification)

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
        projects = Project.objects.get(id=project_id)
        projects.requests.filter(id__in=requests).delete()

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
