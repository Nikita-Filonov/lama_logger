from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from ..serializers.users import DefaultUserSerializer


class UserApi(views.APIView):
    """
    Class for managing personal user data
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request):
        return Response(DefaultUserSerializer(request.user, many=False).data)

    def patch(self, request):
        user = request.user
        serializer = DefaultUserSerializer(
            user,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                DefaultUserSerializer(user, many=False).data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
