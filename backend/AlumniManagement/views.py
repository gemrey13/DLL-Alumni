from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
import json

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets

from .models import *
from .serializers import *


class AlumniProfilePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

 
class AlumniProfileAPIView(APIView):
    pagination_class = AlumniProfilePagination

    def get(self, request):
        queryset = AlumniProfile.objects.all().order_by('alumni_id')

        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = AlumniProfileSerializer(paginated_queryset, many=True)
        
        return Response({
            'results': serializer.data,
            'count':   paginator.page.paginator.count,
            'next':    paginator.get_next_link(),
            'prev':    paginator.get_previous_link()
            })



class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class ProvinceViewSet(viewsets.ModelViewSet):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class BarangayViewSet(viewsets.ModelViewSet):
    queryset = Barangay.objects.all()
    serializer_class = BarangaySerializer