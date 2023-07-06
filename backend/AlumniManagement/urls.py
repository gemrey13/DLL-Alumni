from django.urls import path, include
from .views import *


app_name = "AlumniManagement"



urlpatterns = [
    path('alumni-profile-data/', AlumniProfileAPIView.as_view(), name='PaginatedAlumniData'),
    path('address/countries/', country_list, name='countries'),
    path('address/countries/<int:country_id>/regions/', region_list, name='regions'),
    path('address/regions/<int:region_id>/provinces/', province_list, name='provinces'),
    path('address/provinces/<int:province_id>/cities/', city_list, name='cities'),
    path('address/cities/<int:city_id>/barangays/', barangay_list, name='barangays'),
]