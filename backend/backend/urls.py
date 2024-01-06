from django.contrib import admin
from django.urls import path, include

from api.views import JWTView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

    path('routes/', JWTView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
