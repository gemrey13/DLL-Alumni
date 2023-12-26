from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.shortcuts import render

from .serializers import (
    TableAlumniInformationSerializer,

    AlumniProfileSerializer,
    CurriculumSerializer,
    CourseSerializer
)
from .models import (
    GraduateInformation,
    AlumniProfile,
    Curriculum,
    Course
)




class CurriculumList(ListAPIView):
    queryset = Curriculum.objects.all()
    serializer_class = CurriculumSerializer


class CourseList(ListAPIView):
    serializer_class = CourseSerializer

    def list(self, request, *args, **kwargs):
        course_names = Course.objects.values_list('course_name', flat=True).distinct()

        return Response(course_names)




class TableAlumniPagination(PageNumberPagination):
    page_size = 10

class TableAlumniView(ListAPIView):
    serializer_class = TableAlumniInformationSerializer
    pagination_class = TableAlumniPagination

    def get_queryset(self):
        queryset = GraduateInformation.objects.order_by('graduation_date')

        curriculum_no = self.request.query_params.get('curriculum_no', None)
        curriculum_year = self.request.query_params.get('curriculum_year', None)
        course = self.request.query_params.get('course', None)
        no_of_units = self.request.query_params.get('no_of_units', None)

        if curriculum_no:
            queryset = queryset.filter(alumni__course__curriculum__cmo_no=curriculum_no)
        
        if curriculum_year:
            queryset = queryset.filter(alumni__course__curriculum__curriculum_year=curriculum_year)
        
        if course:
            queryset = queryset.filter(alumni__course__course_name=course)

        if no_of_units:
            queryset = queryset.filter(alumni__course__no_units=no_of_units)

        return queryset
    

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        try:
            alumni_profile = AlumniProfile.objects.get(user=user)
            serializer = AlumniProfileSerializer(alumni_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AlumniProfile.DoesNotExist:
            return Response({'detail': 'AlumniProfile does not exist for this user.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# class AlumniProfilesView(APIView):
#     def get(self, request):
#         profiles = AlumniProfile.objects.all()
#         serializer = AlumniProfileSerializer(profiles, many=True).data
#         return Response(data=serializer, status=status.HTTP_200_OK)

# class SingleProfileView(APIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             user = AlumniProfile.objects.get(alumni_id=kwargs.get('alumni_id'))
#             serializer = GetProfileSerializer(user).data
#             return Response(data=serializer, status=status.HTTP_200_OK)
#         except ObjectDoesNotExist:  
#             return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)

# class CurriculumView(APIView):
#     def get(self, request):
#         curriculum = Curriculum.objects.all()
#         serializer = CurriculumSerializer(curriculum, many=True).data
#         return Response(data=serializer, status=status.HTTP_200_OK)

# class CourseView(APIView):
#     def get(self, request):
#         course = Course.objects.all()
#         serializer = CourseSerializer(course, many=True).data
#         return Response(data=serializer, status=status.HTTP_200_OK)
    
# class CurrentCoursesView(APIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             course = Course.objects.get(course_id=kwargs.get('course_id'))
#             serializer = CourseWithCurriculumSerializer(course).data
#             return Response(data=serializer, status=status.HTTP_200_OK)
#         except ObjectDoesNotExist:
#             return Response(data={'error': "No course found"}, status=status.HTTP_404_NOT_FOUND)

# class GraduateInformationView(APIView):
#     def get(self, request):
#         info = GraduateInformation.objects.all()
#         serializer = GraduateInformationSerializer(info, many=True).data
#         return Response(data=serializer, status=status.HTTP_200_OK)
    
    
class JWTView(APIView):
    def get(self, request, *args, **kwargs):
        """returns a view containing all the possible routes"""
        routes = [
            '/api/token',
            '/api/token/refresh'
        ]
        return Response(routes)
    
# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer

# class CustomTokenRefreshView(TokenRefreshView):
#     serializer_class = CustomTokenObtainPairSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
        
#         try:
#             serializer.is_valid(raise_exception=True)
#         except TokenError as e:
#             return Response({'error': 'Token refresh failed'}, status=status.HTTP_401_UNAUTHORIZED)

#         response_data = {
#             'access': serializer.validated_data['access'],
#             'refresh': serializer.validated_data['refresh'],
#             'userInfo': serializer.validated_data.get('userInfo', {})
#         }

#         return Response(response_data, status=status.HTTP_200_OK)