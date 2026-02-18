from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from contact.models import Contact
from .serializers import ContactSerializer


@api_view(['GET'])
def contacts_view(request):
    if request.method == 'GET':
        contacts = Contact.objects.all()

        if not contacts or len(contacts) == 0:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        serializer = ContactSerializer(data=contacts, many=True)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method not in ['GET', 'POST']:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
