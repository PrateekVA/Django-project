from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Note
from .serializers import NoteSerializer

# Create your views here.

@api_view(['GET'])
def get_notes(request):
    user_id = request.GET.get('user_id')
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    notes = Note.objects.filter(user=user)
    serializer = NoteSerializer(notes, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def create_note(request):
    user_id = request.data.get('user_id')
    content = request.data.get('content')

    if not content:
        return Response({"error":"Content is required"},status=400)
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    note = Note.objects.create(
        content = content,
        user = user
    )

    serializer = NoteSerializer(note)
    return Response(serializer.data, status = 201)

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)
    
    if User.objects.filter(username=username).exists():
        return Response({"error":"Username already exists"}, status=400)
    
    user = User.objects.create(
        username=username,
        password = password
        )
    return Response({
        "message": "User registered successfully",
        "user_id": user.id
    }, status = 201)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password required"}, status = 400)
    
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "Invalid username or password"},status = 400)
    
    if user.password!= password:
        return Response({"error":"Invalid username or password"},status = 400)
    
    return Response({"message":"Login successful", "user_id": user.id}, status = 200)
