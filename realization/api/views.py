from rest_framework.decorators import api_view
from realization.models import Realization
from .serializers import RealizationSerializer
from rest_framework.response import Response


@api_view(['GET'])
def realizations_view(request):
    service = request.query_params.get('service')
    city_slug = request.query_params.get('city_slug')

    qs = Realization.objects.filter(is_published=True)
    if service:
        qs = qs.filter(service=service)
    if city_slug:
        qs = qs.filter(city_slug=city_slug)

    serializer = RealizationSerializer(qs, many=True)
    return Response(serializer.data)
