from rest_framework import serializers
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    PreviousJob,
    Address
)

class GraduateInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraduateInformation
        fields = '__all__'

        
class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = ['alumni_id', 'fname', 'lname', 'date_of_birth', 'course']


class TableAlumniInformationSerializer(serializers.ModelSerializer):
    alumni_id = serializers.CharField(source='alumni.alumni_id')
    course = serializers.CharField(source='alumni.course.course_name')
    alumni_fname = serializers.CharField(source='alumni.fname')
    alumni_lname = serializers.CharField(source='alumni.lname')
    graduation_year = serializers.SerializerMethodField()

    class Meta:
        model = GraduateInformation
        fields = ['alumni_id', 'alumni_fname', 'alumni_lname', 'graduation_year', 'course']

    def get_graduation_year(self, obj):
        return obj.graduation_date.year


class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = '__all__'

# class AddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Address
#         fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add additional fields to the token payload
        user = self.user
        try:
            alumni_profile = AlumniProfile.objects.get(user=user)
            userInfo = {
                'alumni_id': alumni_profile.alumni_id,
                'email': user.email,
                'username': user.username,
                'fname': alumni_profile.fname,
                'lname': alumni_profile.lname,
                'mi': alumni_profile.mi,
                'suffix': alumni_profile.suffix,
                'sex': alumni_profile.sex,
                'contact_number': alumni_profile.contact_number,
                'religion': alumni_profile.religion,
                'marital_status': alumni_profile.marital_status,
                'date_of_birth': alumni_profile.date_of_birth,
                'facebook_account_name': alumni_profile.facebook_account_name,
                'address': alumni_profile.address.country,
                'region': alumni_profile.address.region,
                'province': alumni_profile.address.province,
                'city': alumni_profile.address.city,
                'barangay': alumni_profile.address.barangay,
                'zip_code': alumni_profile.address.zip_code
            }
            data['userInfo'] = userInfo
            return data
        
        except AlumniProfile.DoesNotExist as E:
            return f'AlumniProfile does not exist for user: {self.user}'
        except Exception as e:
            return f'An unexpected error occurred: {e}'


# class CourseSerializer(serializers.ModelSerializer):
#     alumni_count = serializers.SerializerMethodField()

#     class Meta:
#         model = Course
#         fields = '__all__'

#     def get_alumni_count(self, obj):
#         return obj.alumni_count


        
# class GetProfileSerializer(serializers.ModelSerializer):
#     address = AddressSerializer()

#     class Meta:
#         model = AlumniProfile
#         fields = ['alumni_id', 'course', 'fname', 'lname', 'mi', 'suffix', 'sex', 'contact_number', 'religion', 'marital_status', 'date_of_birth', 'address']

# class CourseWithCurriculumSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = '__all__'

# class CurriculumSerializer(serializers.ModelSerializer):
#     courses = CourseWithCurriculumSerializer(many=True, read_only=True)

#     class Meta:
#         model = Curriculum
#         fields = ['cmo_no', 'description', 'curriculum_year', 'courses']

# ###############################################################################
# class CurrentJobSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CurrentJob
#         fields = '__all__'

# class PreviousJobSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PreviousJob
#         fields = '__all__'

# class GraduateInformationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GraduateInformation
#         fields = '__all__'