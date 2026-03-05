from django.shortcuts import render
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from deepface import DeepFace
from students.models import Student
import json

@api_view(['POST'])
def verify_face(request):
    new_photo = request.FILES.get("photo")

    if not new_photo:
        return Response({"status": False, "message": "No image uploaded"})

    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        return Response({"status": False, "message": "Student profile not found"})

    try:
        result = DeepFace.verify(
            img1_path=new_photo,
            img2_path=student.profile_photo.path,
            model_name="Facenet",
            
        )
    except:
        return Response({"status": False, "message": "Face detection failed"})
    

    distance = result["distance"]
    threshold = result["threshold"]
    confidence = round((1 - distance / threshold) * 100, 2)
    confidence = max(0, min(confidence, 100))

    if result["verified"]:
        return Response({"status": True, "message": "Face verified" , "confidence": f"{confidence}%"})
    else:
        return Response({"status": False, "message": "Face does not match" , "confidence": f"{confidence}%"})


