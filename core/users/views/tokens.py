from rest_framework import views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
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


@api_view(['DELETE'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
@throttle_classes((UserRateThrottle,))
def delete_token(request, token_id):
    token = ApiToken.objects.get(id=token_id)
    if token.user == request.user:
        token.delete()
        return Response(
            {'message': 'Token successfully deleted', 'level': 'success'},
            status=status.HTTP_200_OK
        )

    return Response(
        {'message': 'You can not delete this token', 'level': 'warning'},
        status=status.HTTP_403_FORBIDDEN
    )
