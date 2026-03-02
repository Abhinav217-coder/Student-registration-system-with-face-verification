from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "username and password required"}, status=400)
    
    if User.objects.filter(username = username).exists():
        return Response({"error": "username already exists"},status = 400)
    

    User.objects.create_user(username = username , password=password)

    return Response({"Message": "Account create sucessfully"},status = 201)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)
    
    access = AccessToken.for_user(user)

    return Response({
        "access": str(access)
    })
    


@api_view(['POST'])
def logout(request):
    return Response({"message": "Logout successful"})






