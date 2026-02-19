from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from contact.models import Contact
from .serializers import ContactSerializer


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
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
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
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
