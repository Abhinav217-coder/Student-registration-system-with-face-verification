from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from students.models import Student
from deepface import DeepFace
import json

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    profile_photo = request.FILES.get('profile_photo')

    if not username or not password:
        return Response({"error": "username and password required"}, status=400)
    
    if User.objects.filter(username = username).exists():
        return Response({"error": "username already exists"},status = 400)
    

    try:           
        embedding = DeepFace.represent(
            img_path=profile_photo,
            model_name="Facenet",
            enforce_detection=True
        )

        if len(embedding) > 1:
         return Response({
            "status": False,
            "message": "Multiple faces detected."
        }, status=400)

        face_encoding = json.dumps(embedding)

    except:
        return Response({"error": "No face detected in photo. Please upload a clear face photo!"}, status=400)

    

    user = User.objects.create_user(username = username , password=password , email = email)

    Student.objects.create(
        user=user,
        name=username,
        email=email,
        profile_photo=profile_photo,
        face_encoding=face_encoding
    )

    return Response({"message": "Account create sucessfully"},status = 201)


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
    return Response({"message": "Logout sucessful"})






