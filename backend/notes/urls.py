from django.urls import path
from .views import get_notes, create_note, register_user, login_user

urlpatterns = [
    path('notes/', get_notes),
    path('notes/create/', create_note),
    path('register/', register_user),
    path('login/', login_user)
]