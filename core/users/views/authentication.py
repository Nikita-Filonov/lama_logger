from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, throttle_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle

from core.users.serializers.users import UserSerializer


@api_view(['POST'])
@authentication_classes(())
@permission_classes(())
@throttle_classes((UserRateThrottle,))
def registration(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)

        return Response({'token': token.key})

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
