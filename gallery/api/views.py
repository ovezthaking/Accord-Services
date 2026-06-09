from rest_framework.decorators import api_view
from gallery.models import GalleryImage
from .serializers import GalleryImageSerializer
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def gallery_view(request):
    service = request.query_params.get('service', None)
    images = GalleryImage.objects.filter(is_active=True)

    if service:
        images = images.filter(service=service)

    serializer = GalleryImageSerializer(images, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
