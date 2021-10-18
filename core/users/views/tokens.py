from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from ..models import ApiToken
from ..serializers.tokens import ApiTokensSerializer, ApiTokenSerializer


class TokensApi(views.APIView):
    """
    Class for managing personal user data
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request):
        tokens = ApiToken.objects.filter(user=request.user, deleted=False)
        return Response(ApiTokensSerializer(tokens, many=True).data)

    def post(self, request):
        serializer = ApiTokenSerializer(data=request.data, context=request.user)
        if serializer.is_valid():
            token = serializer.save()
            return Response(ApiTokensSerializer(token, many=False).data)

        return Response(
            {
                'message': 'Error happened while creating token',
                'level': 'error',
                'data': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
