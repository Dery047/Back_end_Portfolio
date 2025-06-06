from django.db import models

class Tarea(models.Model):
    titulo = models.CharField(max_length=255)
    completada = models.BooleanField(default=False)
    creada_en = models.DateTimeField(auto_now_add=True)
    completada = models.BooleanField(default=False)
    fecha_limite = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.titulo
