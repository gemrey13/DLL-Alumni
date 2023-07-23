from django.urls import path, include
from .views import *


app_name = "AlumniManagement"



urlpatterns = [
    path('alumni-profile-data/', AlumniProfileAPIView.as_view(), name='PaginatedAlumniData'),
    path('alumni-form/', alumni_form, name='alumni_form'),
    path('check-alumni-id/<str:alumni_id>/', check_alumni_id_existence, name='check-alumni-id'),
    path('delete-alumni/<str:alumni_id>/', delete_alumni, name='delete_alumni'),


    path('table-data/', table_data, name='table_data'),
    path('graduation-years/', graduation_years_view, name='graduation_years'),
    path('course-view/', course_view, name='course_view'),
    path('course-data/', courses_data, name='courses_data'),
    path('curriculum-data/', curriculum_data, name='curriculum_data'),


    path('address/countries/', country_list, name='countries'),
    path('address/countries/<int:country_id>/regions/', region_list, name='regions'),
    path('address/regions/<int:region_id>/provinces/', province_list, name='provinces'),
    path('address/provinces/<int:province_id>/cities/', city_list, name='cities'),
    path('address/cities/<int:city_id>/barangays/', barangay_list, name='barangays'),
]