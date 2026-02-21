from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from contact.models import Contact
from .serializers import ContactSerializer
from contact.utils.parse_contact import parse_contact
from contact.utils.send_mail import send_contact_mail


@api_view(['GET', 'POST'])
def contacts_view(request):
    if request.method == 'GET':
        contacts = Contact.objects.all()

        if not contacts.exists():
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        serializer = ContactSerializer(contacts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        mail_data = parse_contact(request)
        send_contact_mail(mail_data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE'])
def contact_view(request, pk):
    if request.method == 'GET':
        try:
            contact = Contact.objects.get(id=pk)

        except Contact.DoesNotExist:
            return Response(
                {'error': 'contact doesn\'t exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ContactSerializer(contact, many=False)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
    if request.method == 'DELETE':
        try:
            contact = Contact.objects.get(id=pk)

        except Contact.DoesNotExist:
            return Response(
                {'error': 'contact doesn\'t exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        contact.delete()

        return Response(
            {'message': 'Contact deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )

    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
