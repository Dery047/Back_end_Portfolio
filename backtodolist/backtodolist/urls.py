from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse

def home(request):
    return HttpResponse('Bienvenido a ToDoList!')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tareas.urls')), 

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('', home),
]
