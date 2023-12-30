from django.urls import path

from .views import (
    TableAlumniView,
    UserInfoView,
    CurriculumList,
    CourseList,
    CurriculumCourseView,
    AlumniForm,
    GetProfileView,

    JWTView,
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
    path('alumni-form/', AlumniForm.as_view(), name='alumni-form'),
    path('get-profile/', GetProfileView.as_view(), name='get-profile'),

    path('curriculum-list/', CurriculumList.as_view(), name='curriculum-list'),
    path('course-list/', CourseList.as_view(), name='course-list'),
    path('curriculum/', CurriculumCourseView.as_view(), name='curriculum-courses'),

    path('user-info/', UserInfoView.as_view(), name='user-info'),


    path('routes/', JWTView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]