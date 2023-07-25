from django.urls import path, include
from .views import *


app_name = "AlumniManagement"



urlpatterns = [
    path('alumni-form/', alumni_form, name='alumni_form'),
    path('check-alumni-id/<str:alumni_id>/', check_alumni_id_existence, name='check-alumni-id'),
    path('delete-alumni/<str:alumni_id>/', delete_alumni, name='delete_alumni'),
    path('update-alumni-profile/<str:alumni_id>/', update_alumni_profile, name='update_alumni_profile'),


    path('table-data/', table_data, name='table_data'),
    path('graduation-years/', graduation_years_view, name='graduation_years'),
    path('course-view/', course_view, name='course_view'),
    path('course-data/', courses_data, name='courses_data'),
    path('curriculum-data/', curriculum_data, name='curriculum_data'),

    path('salary-dist/', salary_dist, name='salary_dist'),



    path('alumni-profile/<alumni_id>/', alumni_profile_details, name='alumni_profile_details'),

    path('address/countries/', country_list, name='countries'),
    path('address/countries/<int:country_id>/regions/', region_list, name='regions'),
    path('address/regions/<int:region_id>/provinces/', province_list, name='provinces'),
    path('address/provinces/<int:province_id>/cities/', city_list, name='cities'),
    path('address/cities/<int:city_id>/barangays/', barangay_list, name='barangays'),
]