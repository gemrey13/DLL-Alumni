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



class AlumniFormSerializer(serializers.Serializer):
    fname = serializers.CharField()
    lname = serializers.CharField()
    mi = serializers.CharField(allow_blank=True, required=False)
    suffix = serializers.CharField(allow_blank=True, required=False)
    sex = serializers.CharField()
    religion = serializers.CharField()
    marital_status = serializers.CharField()
    date_of_birth = serializers.DateField(format='%Y-%m-%d')
    facebook_account = serializers.CharField()
    contact_number = serializers.CharField()
    alumni_address = serializers.CharField()
    graduation_date = serializers.DateField(format='%Y-%m-%d')
    cmo_no = serializers.CharField()
    course = serializers.CharField()
    certification_title1 = serializers.CharField(allow_blank=True, required=False)
    certification_date1 = serializers.DateField(allow_null=True, required=False, format='%Y-%m-%d')
    certification_title2 = serializers.CharField(allow_blank=True, required=False)
    certification_date2 = serializers.DateField(allow_null=True, required=False, format='%Y-%m-%d')
    certification_title3 = serializers.CharField(allow_blank=True, required=False)
    certification_date3 = serializers.DateField(allow_null=True, required=False, format='%Y-%m-%d')
    job_title = serializers.CharField(allow_blank=True, required=False)
    salary = serializers.DecimalField(allow_null=True, required=False, max_digits=10, decimal_places=2)
    job_type = serializers.CharField(allow_blank=True, required=False)
    company_name = serializers.CharField(allow_blank=True, required=False)
    current_job_address = serializers.CharField(allow_blank=True, required=False)
    current_job_start_date = serializers.DateField(allow_null=True, required=False, format='%Y-%m-%d')
    message = serializers.CharField(allow_blank=True, required=False)


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
    alumni_email = serializers.CharField(source='alumni.user.email')
    graduation_year = serializers.SerializerMethodField()

    class Meta:
        model = GraduateInformation
        fields = ['alumni_id', 'alumni_fname', 'alumni_lname', 'graduation_year', 'course', 'alumni_email']

    def get_graduation_year(self, obj):
        return obj.graduation_date.year


class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = '__all__'


class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
        
#         # Add additional fields to the token payload
#         user = self.user
#         try:
#             alumni_profile = AlumniProfile.objects.get(user=user)
#             userInfo = {
#                 'alumni_id': alumni_profile.alumni_id,
#                 'email': user.email,
#                 'username': user.username,
#                 'fname': alumni_profile.fname,
#                 'lname': alumni_profile.lname,
#                 'mi': alumni_profile.mi,
#                 'suffix': alumni_profile.suffix,
#                 'sex': alumni_profile.sex,
#                 'contact_number': alumni_profile.contact_number,
#                 'religion': alumni_profile.religion,
#                 'marital_status': alumni_profile.marital_status,
#                 'date_of_birth': alumni_profile.date_of_birth,
#                 'facebook_account_name': alumni_profile.facebook_account_name,
#                 'address': alumni_profile.address.country,
#                 'region': alumni_profile.address.region,
#                 'province': alumni_profile.address.province,
#                 'city': alumni_profile.address.city,
#                 'barangay': alumni_profile.address.barangay,
#                 'zip_code': alumni_profile.address.zip_code
#             }
#             data['userInfo'] = userInfo
#             return data
        
#         except AlumniProfile.DoesNotExist as E:
#             return f'AlumniProfile does not exist for user: {self.user}'
#         except Exception as e:
#             return f'An unexpected error occurred: {e}'


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