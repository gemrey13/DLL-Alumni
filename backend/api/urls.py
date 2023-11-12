from django.urls import path
from .views import (
    AlumniProfilesView,
    SingleProfileView,
    CourseView,
    CurriculumView,
    CurrentCoursesView
)

urlpatterns = [
    path('profiles/' , AlumniProfilesView.as_view()),
    path('profile/<str:alumni_id>', SingleProfileView.as_view()),

    path('courses/', CourseView.as_view()),
    path('course/<str:course_id>', CurrentCoursesView.as_view()),

    path('curriculum/', CurriculumView.as_view())
]
