from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.models import RequestsFilter
from core.calls.permissions.common import IsRequestsFilterAllowed
from core.calls.serializers.requests_filters import RequestsFiltersSerializer, RequestsFilterSerializer
from utils.exeptions import BadRequest, NotFound


class RequestsFiltersApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsRequestsFilterAllowed]
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


class RequestsFilterApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsRequestsFilterAllowed]
    throttle_classes = [UserRateThrottle]

    def patch(self, request, project_id, filter_id):
        requests_filter = RequestsFilter.objects.get(id=filter_id)
        serializer = RequestsFilterSerializer(requests_filter, data=request.data, partial=True)

        if serializer.is_valid():
            requests_filter = serializer.save()
            serializer = RequestsFiltersSerializer(requests_filter, many=False)
            return Response(serializer.data)

        raise BadRequest(message='Error happened while updating filter', data=serializer.errors)

    def delete(self, request, project_id, filter_id):
        try:
            request_filter = RequestsFilter.objects.get(id=filter_id)
        except RequestsFilter.DoesNotExist:
            raise NotFound('Requests filter does not exists')

        request_filter.delete()
        return Response({'message': 'Requests filter was successfully deleted', 'level': 'success'})
