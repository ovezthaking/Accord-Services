from gallery.models import GalleryImage
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class GalleryImageSerializer(ModelSerializer):
    image_url = SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = ('id', 'image_url', 'service', 'order')

    def get_image_url(self, obj):
        return obj.image.url
