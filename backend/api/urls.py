from django.urls import path

from .views import (
    AlumniProfilesView,
    SingleProfileView,
    CourseView,
    CurriculumView,
    CurrentCoursesView,

    JWTView,
    CustomTokenObtainPairView
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('profiles/' , AlumniProfilesView.as_view()),
    path('profile/<str:alumni_id>', SingleProfileView.as_view()),

    path('courses/', CourseView.as_view()),
    path('course/<str:course_id>', CurrentCoursesView.as_view()),

    path('curriculum/', CurriculumView.as_view()),

    path('routes/', JWTView.as_view()),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]