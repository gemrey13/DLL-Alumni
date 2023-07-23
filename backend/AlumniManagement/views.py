from django.shortcuts import render, get_object_or_404
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
def check_alumni_id_existence(request, alumni_id):
    exists = AlumniProfile.objects.filter(alumni_id=alumni_id).exists()

    return Response({'exists': exists})


@api_view(['POST'])
def alumni_form(request):
    data = request.data
    try:
        # Extract the form data from the request
        alumni_id = data['alumni_id']
        fname = data['fname']
        lname = data['lname']
        mi = data['mi']
        suffix = data['suffix']
        contact_number = data['contact_number']
        sex = data['sex']
        religion = data['religion']
        marital_status = data['marital_status']
        date_of_birth = data['date_of_birth']

        # Create an AlumniProfile object and save it to the database
        alumni_profile = AlumniProfile(
            alumni_id=alumni_id,
            fname=fname,
            lname=lname,
            mi=mi,
            suffix=suffix,
            contact_number=contact_number,
            sex=sex,
            religion=religion,
            marital_status=marital_status,
            date_of_birth=date_of_birth
        )
        alumni_profile.save()

        return Response({'message': 'Alumni profile created successfully'})
    except KeyError:
        return Response({'error': 'Invalid data provided'}, status=400)


@api_view(['GET'])
def table_data(request):
    year = request.GET.get('year')
    course = request.GET.get('course')
    employment_status = request.GET.get('employment_status')

    # Filter the data based on the year and course, if provided
    data = Graduate.objects.all()

    if year:
        data = data.filter(graduation_date__year=year)

    if course:
        data = data.filter(course__course_id=course)

    # Retrieve the desired fields and add graduation_year field
    data = data.values('alumni__alumni_id', 'alumni__fname', 'alumni__lname', 'course__course_id', 'graduation_date', 'alumni__user__email', 'alumni__contact_number')

    for item in data:
        graduation_date = item['graduation_date']
        year = graduation_date.year
        item['graduation_year'] = year

        alumni_id = item['alumni__alumni_id']
        has_current_job = CurrentJob.objects.filter(alumni__alumni_id=alumni_id).exists()
        item['employment_status'] = 'Employed' if has_current_job else 'Unemployed'

    if employment_status:
        data = [item for item in data if item['employment_status'] == employment_status]

    # Return the data as a JSON response
    return Response(data, status=200)


@api_view(['GET'])
def graduation_years_view(request):
    queryset = Graduate.objects.values_list('graduation_date', flat=True).distinct()
    years = {date.year for date in queryset if date}
    return Response(list(years))


@api_view(['GET'])
def course_view(request):
    queryset = Course.objects.values_list('course_id', flat=True).distinct()
    courses = {course for course in queryset if course}
    return Response(list(courses))


@api_view(['GET'])
def courses_data(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def curriculum_data(request):
    curriculum = Curriculum.objects.all()
    serializer = CurriculumSerializer(curriculum, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_alumni(request, alumni_id):
    alumni = get_object_or_404(AlumniProfile, alumni_id=alumni_id)
    alumni.delete()
    return Response({'message': 'Alumni deleted successfully'})




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