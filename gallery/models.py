from django.db import models
from cloudinary.models import CloudinaryField


# Create your models here.
class GalleryService(models.TextChoices):
    HEATPUMPS = 'pompy', 'Pompy Ciepła'
    AC = 'klimatyzacja', 'Klimatyzacja'
    RECUPERATION = 'rekuperacja', 'Rekuperacja'
    SOLAR = 'fotowoltaika', 'Fotowoltaika'
    ABOUT = 'o-nas', 'Dlaczego my'


class GalleryImage(models.Model):
    image = CloudinaryField('image')
    service = models.CharField(
        max_length=50,
        choices=GalleryService.choices,
    )
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['service', 'order']
        verbose_name = "Zdjęcie galerii"
        verbose_name_plural = "Zdjęcia galerii"

    def __str__(self):
        return f"{self.get_service_display()} #{self.order}"
