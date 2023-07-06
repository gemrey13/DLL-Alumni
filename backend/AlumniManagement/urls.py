from django.urls import path, include
from rest_framework import routers
from .views import *


app_name = "AlumniManagement"

router = routers.DefaultRouter()
router.register(r'countries', CountryViewSet)
router.register(r'regions', RegionViewSet)
router.register(r'provinces', ProvinceViewSet)
router.register(r'cities', CityViewSet)
router.register(r'barangays', BarangayViewSet)


urlpatterns = [
    path('alumni-profile-data/', AlumniProfileAPIView.as_view(), name='PaginatedAlumniData'),
    path('address/', include(router.urls)),
]