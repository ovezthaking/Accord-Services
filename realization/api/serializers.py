from rest_framework.serializers import ModelSerializer, SerializerMethodField
from realization.models import Realization


class RealizationSerializer(ModelSerializer):
    cover_image_url = SerializerMethodField()

    class Meta:
        model = Realization
        fields = (
            'id', 'title', 'city', 'city_slug', 'service',
            'description', 'device_model', 'area_m2',
            'cover_image_url', 'created_at'
        )

    def get_cover_image_url(self, obj):
        return obj.cover_image.url
