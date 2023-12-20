from rest_framework import serializers
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

class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add additional fields to the token payload
        user = self.user
        try:
            alumni_profile = AlumniProfile.objects.get(user=user)

            # Add AlumniProfile fields to the token payload
            data['alumni_id'] = alumni_profile.alumni_id
            data['fname'] = alumni_profile.fname
            data['lname'] = alumni_profile.lname
            data['mi'] = alumni_profile.mi
            data['suffix'] = alumni_profile.suffix
            data['sex'] = alumni_profile.sex
            data['contact_number'] = alumni_profile.contact_number
            data['religion'] = alumni_profile.religion
            data['marital_status'] = alumni_profile.marital_status
            data['date_of_birth'] = alumni_profile.date_of_birth
            data['facebook_account_name'] = alumni_profile.facebook_account_name
            data['address'] = alumni_profile.address.country
            data['region'] = alumni_profile.address.region
            data['province'] = alumni_profile.address.province
            data['city'] = alumni_profile.address.city
            data['barangay'] = alumni_profile.address.barangay
            data['zip_code'] = alumni_profile.address.zip_code

            return data
        
        except AlumniProfile.DoesNotExist as E:
            return f'AlumniProfile does not exist for user: {self.user}'
        except Exception as e:
            return f'An unexpected error occurred: {e}'


class CourseSerializer(serializers.ModelSerializer):
    alumni_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_alumni_count(self, obj):
        return obj.alumni_count


        
class GetProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = AlumniProfile
        fields = ['alumni_id', 'course', 'fname', 'lname', 'mi', 'suffix', 'sex', 'contact_number', 'religion', 'marital_status', 'date_of_birth', 'address']

class CourseWithCurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CurriculumSerializer(serializers.ModelSerializer):
    courses = CourseWithCurriculumSerializer(many=True, read_only=True)

    class Meta:
        model = Curriculum
        fields = ['cmo_no', 'description', 'curriculum_year', 'courses']

###############################################################################
class CurrentJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentJob
        fields = '__all__'

class PreviousJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreviousJob
        fields = '__all__'

class GraduateInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraduateInformation
        fields = '__all__'