from rest_framework import serializers
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

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class GraduateInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraduateInformation
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        

class GetProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = AlumniProfile
        fields = ['alumni_id', 'course', 'fname', 'lname', 'mi', 'suffix', 'sex', 'contact_number', 'religion', 'marital_status', 'date_of_birth', 'address']

class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = '__all__'


class CurrentJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentJob
        fields = '__all__'

class PreviousJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreviousJob
        fields = '__all__'