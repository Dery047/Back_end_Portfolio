from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TareaViewSet
from .views import TareaViewSet, RegisterUserAPIView  # IMPORTA RegisterUserAPIView aquí

router = DefaultRouter()
router.register(r'tareas', TareaViewSet,basename='tarea')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUserAPIView.as_view(), name='register'),

]
