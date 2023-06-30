from django.shortcuts import render
from django.http import JsonResponse
from .models import *

# Create your views here.
def get_barangays(request):
    city_id = request.GET.get('city_id')
    barangays = Barangay.objects.filter(city_id=city_id).values('id', 'barangay_name')

    return JsonResponse({'barangays': list(barangays)})

def get_provinces(request):
    country_id = request.GET.get('country_id')
    jobcountry_id = request.GET.get('jobcountry_id')
    provinces = Province.objects.filter(country_id=country_id).values('id', 'province_name')
    jobprovinces = Province.objects.filter(country_id=jobcountry_id).values('id', 'province_name')

    return JsonResponse({'provinces': list(provinces), 'jobprovinces': list(jobprovinces)})

def get_cities(request):
    province_id = request.GET.get('province_id')
    cities = City.objects.filter(province_id=province_id).values('id', 'city_name')

    return JsonResponse({'cities': list(cities)})