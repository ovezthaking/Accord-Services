from django.core.mail import send_mail


def send_contact_mail(mail_data: dict):
    send_mail(
        subject=mail_data.get('full_name') + ' - ' + mail_data.get('services'),
        message='Otrzymano wiadomość:\n' +
        f'Imię i nazwisko: {mail_data.get('full_name')}\n' +
        f'Adres e-mail: {mail_data.get('email')}\n' +
        f'Numer telefonu: {mail_data.get('phone_number')}\n' +
        'Treść wiadomości: \n' +
        mail_data.get('description'),
        from_email="accordstrona@gmail.com",
        recipient_list=['oliwerx12@gmail.com', 'accordservice@interia.pl'],
        fail_silently=False
    )
