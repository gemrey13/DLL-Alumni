from rest_framework import serializers
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    EmploymentRecord,
    Address
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        try:
            alumni_profile = AlumniProfile.objects.get(user=user)
            alumni_profile_serialized = AlumniProfileSerializer(alumni_profile)

            current_job = CurrentJob.objects.get(alumni=alumni_profile)
            current_job_serialized = CurrentJobSerializer(current_job)
        except AlumniProfile.DoesNotExist:
            alumni_profile = None
        except CurrentJob.DoesNotExist:
            current_job_serialized = False
        token = super().get_token(user)
        

        token['username'] = user.username
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['is_staff'] = user.is_superuser
        token['profile_info'] = alumni_profile_serialized.data
        token['current_job'] = current_job_serialized.data if current_job_serialized else None

        return token
    
        

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class GraduateInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraduateInformation
        fields = '__all__'

        

class CurrentJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentJob
        fields = '__all__'


class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class EmploymentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentRecord
        fields = '__all__'

class MonthlySalaryDistributionSerializer(serializers.Serializer):
    x = serializers.CharField()
    y = serializers.ListField(child=serializers.IntegerField())

class AlumniGraduationYearDistributionAnalysisSerializer(serializers.Serializer):
    year_graduated = serializers.IntegerField()
    alumni_count = serializers.IntegerField()


class EmploymentDataSerializer(serializers.Serializer):
    name = serializers.CharField(allow_blank=True, required=False)
    dateEmployed = serializers.DateField(allow_null=True, required=False, format='%Y-%m-%d')
    employmentStatus = serializers.CharField(allow_blank=True, required=False)
    monthlySalary = serializers.DecimalField(allow_null=True, required=False, max_digits=10, decimal_places=2)


class AlumniFormSerializer(serializers.Serializer):
    fname = serializers.CharField()
    lname = serializers.CharField()
    mi = serializers.CharField(allow_blank=True, required=False)
    sex = serializers.CharField()
    religion = serializers.CharField()
    civil_status = serializers.CharField()
    date_of_birth = serializers.DateField(format='%Y-%m-%d')
    facebook_account = serializers.CharField()
    contact_number = serializers.CharField()
    alumni_address = serializers.CharField()
    year_graduated = serializers.CharField()
    course = serializers.CharField()
    job_position = serializers.CharField(allow_blank=True, required=False)
    salary = serializers.DecimalField(allow_null=True, required=False, max_digits=10, decimal_places=2)
    current_job_address = serializers.CharField(allow_blank=True, required=False)
    company_affiliation = serializers.CharField(allow_blank=True, required=False)
    employed_within_6mo = serializers.BooleanField()
    promoted_in_current_job = serializers.BooleanField()
    getting_jobs_related_to_experience = serializers.BooleanField()
    description = serializers.CharField(allow_blank=True, required=False)
    employmentData = EmploymentDataSerializer(many=True, allow_empty=True, required=False)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Remove 'employmentData' key if it's empty to match the provided JSON structure
        if not data['employmentData']:
            del data['employmentData']
        return data


class EmployedWithinSixMonthsAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentJob
        fields = '__all__'


class TableAlumniInformationSerializer(serializers.ModelSerializer):
    alumni_id = serializers.CharField(source='alumni.alumni_id')
    course = serializers.CharField(source='alumni.course.course_name')
    alumni_fname = serializers.CharField(source='alumni.fname')
    alumni_lname = serializers.CharField(source='alumni.lname')
    employment_status = serializers.SerializerMethodField()
    has_current_job = serializers.SerializerMethodField()
    year_graduated = serializers.SerializerMethodField()

    class Meta:
        model = GraduateInformation
        fields = ['alumni_id', 'alumni_fname', 'alumni_lname', 'year_graduated', 'course', 'has_current_job', 'employment_status']

    def get_year_graduated(self, obj):
        return obj.year_graduated
    
    def get_has_current_job(self, obj):
        alumni_profile = obj.alumni
        return alumni_profile.current_job.exists()
    
    def get_employment_status(self, obj):
        alumni_profile = obj.alumni
        current_job = alumni_profile.current_job.first()
        return current_job.employment_status if current_job else None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AccountInformationSerializer(serializers.ModelSerializer):
    current_job = serializers.SerializerMethodField()
    home_address = AddressSerializer()
    user = UserSerializer()

    class Meta:
        model = AlumniProfile
        fields = '__all__'
    
    def get_current_job(self, obj):
        # Assuming you have a related_name or reverse relation named 'current_jobs'
        first_current_job = obj.current_job.first()
        if first_current_job:
            return CurrentJobSerializer(first_current_job).data
        else:
            return None




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