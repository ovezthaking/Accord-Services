from django.core.mail import send_mail


def send_contact_mail(
        email: str, phone_number: str, title: str,
        services: str, description: str
):
    send_mail(
        subject=title + ' - ' + services,
        message='Otrzymano wiadomość:\n' +
        f'Adres e-mail: {email}\n' +
        f'Numer telefonu: {phone_number}\n' +
        'Treść wiadomości: \n' +
        description,
        from_email="kontaktovez@gmail.com",
        recipient_list=['oliwerx12@gmail.com'],
        fail_silently=False
    )
