from django.urls import path
from .views import create_student, student_list, student_detail, update_student,delete_student

urlpatterns = [
    path('create/', create_student),
    path('list/', student_list),
    path('<int:id>/', student_detail),
    path('update/<int:id>/', update_student),
    path('<int:id>/delete/', delete_student),
]