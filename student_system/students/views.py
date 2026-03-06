from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Student


@api_view(['POST'])
def create_student(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    name = request.data.get("name")
    profile_photo = request.FILES.get("profile_photo")

    
    if not username or not email or not password or not name:

     return Response({"status": False, "message": "All fields are required"})

    if not profile_photo:

        return Response({"status": False, "message": "Profile photo is required"})
    

    if User.objects.filter(username=username).exists():
      return Response({"status": False, "message": "Username already exists"})
    
    

    user = User.objects.create_user(
    username=username,
    email=email,
    password=password
    )


    student = Student.objects.create(
        name=name,
        user=user, 
        email=email,
        profile_photo=profile_photo,
    )

    return Response({"status": True, "message": "Student created successfully", "data": {
        "id": student.id,
        "name": student.name,
        "email": student.email,
        "profile_photo": student.profile_photo.url
    }})



@api_view(['GET'])
def student_list(request):
    students = Student.objects.all()
    data = []
    for student in students:
        data.append({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "profile_photo": student.profile_photo.url if student.profile_photo else None
        })
    return Response({"status": True, "data": data})


@api_view(['GET'])
def student_detail(request, id):
    try:
        student = Student.objects.get(id=id)

        data = {
            "id": student.id,
            "name": student.name,
            "email": student.user.email,
            "profile_photo": student.profile_photo.url if student.profile_photo else None
        }

        return Response({"status": True, "data": data})

    except Student.DoesNotExist:
        return Response({"status": False, "message": "Student not found"})
    


@api_view(['PUT'])
def update_student(request, id):
    try:
        student = Student.objects.get(id=id)

        student.name = request.data.get("name", student.name)
        student.email = request.data.get("email", student.email)  
        student.user.email = request.data.get("email", student.user.email)

        if request.FILES.get("profile_photo"):
            student.profile_photo = request.FILES.get("profile_photo")

        student.save()
        student.user.save()

        return Response({"status": True, "message": "Student updated successfully"})

    except Student.DoesNotExist:
        return Response({"status": False, "message": "Student not found"})


@api_view(['DELETE'])
def delete_student(request, id):
    try:
        student = Student.objects.get(id=id)
        user = student.user
        student.delete()
        user.delete()
        return Response({"status": True, "message": "Student deleted successfully"})
    except Student.DoesNotExist:
        return Response({"status": False, "message": "Student not found"})