from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Tarea(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)  
    completada = models.BooleanField(default=False)
    creada_en = models.DateTimeField(auto_now_add=True)
    completada = models.BooleanField(default=False)
    fecha_limite = models.DateField(null=True, blank=True)



    def __str__(self):
        return self.titulo
