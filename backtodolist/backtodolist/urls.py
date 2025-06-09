from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,

)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tareas.urls')),  # Incluí las rutas de la app
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login y obtener token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Renovar token
    
]
