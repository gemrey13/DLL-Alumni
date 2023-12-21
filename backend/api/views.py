from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist

from .serializers import (
    AlumniProfileSerializer,
    GraduateInformationSerializer,
    CurriculumSerializer,
    CourseSerializer,
    CurrentJobSerializer,
    PreviousJobSerializer,
    GetProfileSerializer,
    CourseWithCurriculumSerializer,
    CustomTokenObtainPairSerializer
)
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    PreviousJob,
)

class AlumniProfilesView(APIView):
    def get(self, request):
        profiles = AlumniProfile.objects.all()
        serializer = AlumniProfileSerializer(profiles, many=True).data
        return Response(data=serializer, status=status.HTTP_200_OK)

class SingleProfileView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user = AlumniProfile.objects.get(alumni_id=kwargs.get('alumni_id'))
            serializer = GetProfileSerializer(user).data
            return Response(data=serializer, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:  
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)

class CurriculumView(APIView):
    def get(self, request):
        curriculum = Curriculum.objects.all()
        serializer = CurriculumSerializer(curriculum, many=True).data
        return Response(data=serializer, status=status.HTTP_200_OK)

class CourseView(APIView):
    def get(self, request):
        course = Course.objects.all()
        serializer = CourseSerializer(course, many=True).data
        return Response(data=serializer, status=status.HTTP_200_OK)
    
class CurrentCoursesView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            course = Course.objects.get(course_id=kwargs.get('course_id'))
            serializer = CourseWithCurriculumSerializer(course).data
            return Response(data=serializer, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(data={'error': "No course found"}, status=status.HTTP_404_NOT_FOUND)

class GraduateInformationView(APIView):
    def get(self, request):
        info = GraduateInformation.objects.all()
        serializer = GraduateInformationSerializer(info, many=True).data
        return Response(data=serializer, status=status.HTTP_200_OK)
    
    
class JWTView(APIView):
    def get(self, request, *args, **kwargs):
        """returns a view containing all the possible routes"""
        routes = [
            '/api/token',
            '/api/token/refresh'
        ]
        return Response(routes)
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer