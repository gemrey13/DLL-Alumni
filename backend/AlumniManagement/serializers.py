from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = '__all__'


class AlumniProfileSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    jobaddress_country_name = serializers.SerializerMethodField()
    jobaddress_province_name = serializers.SerializerMethodField()
    jobaddress_city_name = serializers.SerializerMethodField()
    jobaddress_region_name = serializers.SerializerMethodField()
    jobaddress_barangay_name = serializers.SerializerMethodField()

    alumniaddress_country_name = serializers.SerializerMethodField()
    alumniaddress_province_name = serializers.SerializerMethodField()
    alumniaddress_city_name = serializers.SerializerMethodField()
    alumniaddress_region_name = serializers.SerializerMethodField()
    alumniaddress_barangay_name = serializers.SerializerMethodField()

    def get_email(self, obj):
        return obj.user.email if obj.user else None

    def get_jobaddress_country_name(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.country.id:
                    return job_address.country.country_name
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_province_name(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.province:
                    return job_address.province.province_name
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_city_name(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.city:
                    return job_address.city.city_name
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_region_name(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.region:
                    return job_address.region.region_name
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_barangay_name(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.barangay:
                    return job_address.barangay.barangay_name
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_alumniaddress_country_name(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.country:
                    return alumni_address.country.country_name
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_province_name(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.province:
                    return alumni_address.province.province_name
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_city_name(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.city:
                    return alumni_address.city.city_name
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_region_name(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.region:
                    return alumni_address.region.region_name
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_barangay_name(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.barangay:
                    return alumni_address.barangay.barangay_name
        except AlumniAddress.DoesNotExist:
            pass
        return None

    class Meta:
        model = AlumniProfile
        fields = [
            'alumni_id', 'fname', 'lname', 'mi', 'suffix', 'contact_number', 'sex',
            'religion', 'marital_status', 'date_of_birth', 'email', 'jobaddress_country_name',
            'jobaddress_province_name', 'jobaddress_city_name', 'jobaddress_region_name',
            'jobaddress_barangay_name', 'alumniaddress_country_name', 'alumniaddress_province_name',
            'alumniaddress_city_name', 'alumniaddress_region_name', 'alumniaddress_barangay_name',
        ]



class GraduateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graduate
        fields = ('graduation_date',)


class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = ('id', 'barangay_name')

class CitySerializer(serializers.ModelSerializer):
    barangays = BarangaySerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = ('id', 'city_name', 'barangays')

class ProvinceSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = Province
        fields = ('id', 'province_name', 'cities')

class RegionSerializer(serializers.ModelSerializer):
    provinces = ProvinceSerializer(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ('id', 'region_name', 'provinces')

class CountrySerializer(serializers.ModelSerializer):
    regions = RegionSerializer(many=True, read_only=True)

    class Meta:
        model = Country
        fields = ('id', 'country_name', 'regions')