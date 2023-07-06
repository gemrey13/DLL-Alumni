from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view

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



@api_view(['GET'])
def country_list(request):
    countries = Country.objects.all()
    serializer = CountrySerializer(countries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def region_list(request, country_id):
    regions = Region.objects.filter(country_id=country_id)
    serializer = RegionSerializer(regions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def province_list(request, region_id):
    provinces = Province.objects.filter(region_id=region_id)
    serializer = ProvinceSerializer(provinces, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def city_list(request, province_id):
    cities = City.objects.filter(province_id=province_id)
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def barangay_list(request, city_id):
    barangays = Barangay.objects.filter(city_id=city_id)
    serializer = BarangaySerializer(barangays, many=True)
    return Response(serializer.data)