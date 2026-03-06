Student Registration System with Face Verification

full-stack web application built with Django REST Framework(backend) and React (frontend) that allows students to register, login, and verify their identity using face recognition.

Features

Student Registration with profile photo
JWT Authentication (Login / Logout)
Face Verification using DeepFace
Student CRUD (Create, Read, Update, Delete)
Protected Routes
Face Encoding stored in database

Backend-Django, Django REST Framework
Frontend -React, Vite, Axios 
Auth - jwt (SimpleJWT)
Face Recognition - DeepFace (Facenet model)
Database - SQLite 

student registration with face verification/
  student_system/   
  accounts/           
  students/          
  face_verification/  
  backend/            

 frontend/               
 src/
 pages/         
 components/     
 api/            


Make sure you have installed:
- Python 3.10+
- Node.js 18+
- pip
- npm

Backend Setup

1.Clone the repository:

git clone https://github.com/Abhinav217-coder/Student-registration-system-with-face-verification.git
cd Student-registration-system-with-face-verification


Create and activate virtual environment
in terminal type : 
python -m venv venv

activate the virtual enviorement
venv\Scripts\activate

if mac/Linux :

source venv/bin/activate

Install dependencies:
then type:
cd student_system
pip install -r requirements.txt

Run database migrations:

python manage.py makemigrations
python manage.py migrate


Start Django server:

python manage.py runserver

Backend runs at: http://127.0.0.1:8000

Frontend Setup

Open new terminal and go to frontend folder

cd frontend

Install dependencies:
npm install

Start React app
npm run dev

Frontend runs at http://localhost:5173

Dependencies

Backend (Python)
django
djangorestframework
djangorestframework-simplejwt
django-cors-headers
deepface
pillow
numpy
tf-keras

Install all at once:
in terminal :
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers deepface pillow numpy tf-keras

Frontend 
react
react-dom
react-router-dom
axios
vite

Install all at once:
npm install

API Endpoints

Accounts
Method
Endpoint
description

| POST |/api/accounts/register/| Register new student |
| POST |/api/accounts/login/| Login and get token |
| POST |/api/accounts/logout/| Logout |

Students
method
endpoints
description

| GET |/api/students/list/| Get all students | ,
| POST |/api/students/create/| Create new student | , 
| GET |/api/students/<id>/| Get student detail |, 
| PUT |/api/students/update/<id>/| Update student | , 
| DELETE |/api/students/<id>/delete/| Delete student |

Face Verification
method
endpoint
description
| POST |/api/face_verification/verify/| Verify face |

User Flow

Register → Login → Face Verify → Dashboard → Manage Students


1.Register — Enter username, email, password and upload profile photo
2.Login— Enter username and password to get JWT token
3.Face Verify — Upload photo to verify identity
4.Dashboard— Access student management
5.CRUD— Create, view, update, delete students

Database Structure

user table (Django default)

| Column | Type |
| id | Integer (PK) |
| username | String |
| email | String |
| password | String (hashed) |

students table
| Column | Type |
| id | Integer (PK) |
| name | String |
| email | String |
| profile_photo | Image path |
| face_encoding | Text (JSON) |
| user_id | FK → auth_user |

Important Notes

Use .jpg or .png photos for best face detection results
Face verification may take 30-60 seconds
JWT token expires after 1 day
Make sure Django server is running before starting React

Author

Abhinav TK
GitHub: https://github.com/Abhinav217-coder/Student-registration-system-with-face-verification
