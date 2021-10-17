from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.calls.serializers.custom_requests import CustomRequestSerializer, CustomRequestsSerializer


class CustomRequestsApi(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, project_id):
        serializer = CustomRequestSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            custom_request = serializer.save()

            return Response(
                CustomRequestsSerializer(custom_request, many=False).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
