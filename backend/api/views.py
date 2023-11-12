from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist

from .serializers import (
    AlumniProfileSerializer,
    GraduateInformationSerializer,
    CurriculumSerializer,
    CourseSerializer,
    CurrentJobSerializer,
    PreviousJobSerializer,
    GetProfileSerializer
)
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    PreviousJob,
    CustomUser
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


class GraduateInformationView(APIView):
    def get(self, request):
        info = GraduateInformation.objects.all()
        serializer = GraduateInformationSerializer(info, many=True).data
        return Response(data=serializer, status=status.HTTP_200_OK)
    

class CurriculumView(APIView):
    def get(self, request):
        curriculum = Curriculum.objects.all()
        serializer = CurriculumSerializer(curriculum, many=True).data
        return Response(data=serializer, status=status.HTTP_200_OK)
    
