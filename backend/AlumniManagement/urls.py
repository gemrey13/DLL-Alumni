from django.urls import path
from .views import *

app_name = "AlumniManagement"

urlpatterns = [
    path('alumni-profile-data/', AlumniProfileAPIView.as_view(), name='PaginatedAlumniData'),
    # path('', views.dashboard, name="dashboard"),
    # path('alumni/', views.alumni, name="alumni"),
    # path('alumni/<str:alumni_id>/', views.alumni_profile, name='alumni_profile'),

    # path('sample2/', views.sample2, name="sample2"),

    path('get_provinces/', get_provinces, name='get-provinces'),
    path('get_cities/', get_cities, name='get-cities'),
    path('get_barangays/', get_barangays, name='get-barangays'),

    # path('delete_currrent_job/<str:job_id>/', views.del_current_job, name='delete_currrent_job'),
    # path('delete_prev_job/<str:job_id>/', views.del_prev_job, name='delete_prev_job'),
    # path('delete_alumni/<str:alumni_id>/', views.del_alumni, name='delete_alumni'),
]