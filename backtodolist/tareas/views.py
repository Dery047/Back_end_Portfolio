from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.serializers import ModelSerializer
from .models import Tarea
from .serializers import TareaSerializer

# ViewSet para las tareas (protegida para usuarios autenticados)
class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all().order_by('-creada_en')
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden usar esta API

# Serializer para registrar usuarios
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# API para registro de usuarios
class RegisterUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
