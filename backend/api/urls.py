from django.urls import path

from .views import (
    TableAlumniView,
    UserInfoView,
    CurriculumList,
    CourseList,
    CurriculumCourseView,
    AlumniForm,
    GetProfileView,
    AccountInformationView,

    TestAnalysisView,
    AnalysisTest2View,

    JWTView,
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)

urlpatterns = [
    path('table-alumni/', TableAlumniView.as_view(), name='table-alumni'),
    path('alumni-form/', AlumniForm.as_view(), name='alumni-form'),
    path('get-profile/', GetProfileView.as_view(), name='get-profile'),

    path('curriculum-list/', CurriculumList.as_view(), name='curriculum-list'),
    path('course-list/', CourseList.as_view(), name='course-list'),
    path('curriculum/', CurriculumCourseView.as_view(), name='curriculum-courses'),

    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('account-info/', AccountInformationView.as_view(), name='admin-info'),

    path('analysis/', TestAnalysisView.as_view(), name='analysis'),
    path('analysis2/', AnalysisTest2View.as_view(), name='analysis2'),

    

    path('routes/', JWTView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]