from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *



class AlumniProfilePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

 
class AlumniProfileAPIView(APIView):
    pagination_class = AlumniProfilePagination

    def get(self, request):
        queryset = AlumniProfile.objects.all()
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = AlumniProfileSerializer(paginated_queryset, many=True)
        return Response({
            'results': serializer.data,
            'count':   paginator.page.paginator.count,
            'next':    paginator.get_next_link(),
            'prev':    paginator.get_previous_link()
            })

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