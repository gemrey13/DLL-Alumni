from django.urls import path

from .views import (
    TableAlumniView,
    UserInfoView,

    JWTView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)

urlpatterns = [
    # path('profiles/' , AlumniProfilesView.as_view()),
    # path('profile/<str:alumni_id>', SingleProfileView.as_view()),

    # path('courses/', CourseView.as_view()),
    # path('course/<str:course_id>', CurrentCoursesView.as_view()),

    # path('curriculum/', CurriculumView.as_view()),

    path('table-alumni/', TableAlumniView.as_view(), name='table-alumni'),

    path('user-info/', UserInfoView.as_view(), name='user-info'),


    path('routes/', JWTView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]