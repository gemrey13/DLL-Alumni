from django.urls import path
from .views import (
    AlumniProfilesView,
    SingleProfileView
)

urlpatterns = [
    path('profiles/' , AlumniProfilesView.as_view()),
    path('profile/<str:alumni_id>', SingleProfileView.as_view())
]
