from django.db import models
from django.core.validators import RegexValidator, EmailValidator


# Create your models here.
class ContactStatus(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


def get_default_contact_status_id():
    status, _ = ContactStatus.objects.get_or_create(name='nowy')
    return status.id


class Contact(models.Model):
    """TODO: przemyśleć pole status i ewentualne wydzielenie services.

    Ewentualnie do osobnego modelu.
    """

    SERVICE_CHOICES = (
        ('pompy', 'Pompy Ciepła'),
        ('klimatyzacja', 'Klimatyzacja'),
        ('rekuperacja', 'Rekuperacja'),
        ('fotowoltaika', 'Fotowoltaika'),
        ('serwis', 'Serwis')
    )

    phone_regex = RegexValidator(
        regex=r'^\+?[\d\s().-]{5,25}$',
        message='Phone format: +99999999. Up to 15 digits.'
    )

    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=25,
        unique=True,
        validators=[phone_regex]
    )
    email = models.EmailField(
        max_length=254,
        unique=True,
        validators=[EmailValidator()]
    )
    services = models.CharField(
        max_length=50,
        choices=SERVICE_CHOICES,
        default='pompy'
    )
    description = models.TextField(blank=True, null=True)
    status = models.ForeignKey(
        ContactStatus,
        on_delete=models.PROTECT,
        default=get_default_contact_status_id,
    )
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return self.full_name


class EmailRecipient(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} <{self.email}>" if self.name else self.email

    class Meta:
        verbose_name = "Odbiorca e-mail"
        verbose_name_plural = "Odbiorcy e-mail"
