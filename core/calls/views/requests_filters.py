from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.models import RequestsFilter
from core.calls.serializers.requests_filters import RequestsFiltersSerializer, RequestsFilterSerializer
from utils.exeptions import BadRequest


class RequestsFiltersApi(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, project_id):
        requests_filters = RequestsFilter.objects.filter(project_id=project_id).order_by('-created')
        serializer = RequestsFiltersSerializer(requests_filters, many=True)
        return Response(serializer.data)

    def post(self, request, project_id):
        context = {'project_id': project_id, 'user_id': request.user.id}
        serializer = RequestsFilterSerializer(data=request.data, context=context)
        if serializer.is_valid():
            requests_filter = serializer.save()
            serializer = RequestsFiltersSerializer(requests_filter, many=False)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        raise BadRequest(message='Error happened while creating filter', data=serializer.errors)
