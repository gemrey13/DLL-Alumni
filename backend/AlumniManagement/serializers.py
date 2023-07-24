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
    jobaddress_country_id = serializers.SerializerMethodField()
    jobaddress_province_id = serializers.SerializerMethodField()
    jobaddress_city_id = serializers.SerializerMethodField()
    jobaddress_region_id = serializers.SerializerMethodField()
    jobaddress_barangay_id = serializers.SerializerMethodField()

    alumniaddress_country_id = serializers.SerializerMethodField()
    alumniaddress_province_id = serializers.SerializerMethodField()
    alumniaddress_city_id = serializers.SerializerMethodField()
    alumniaddress_region_id = serializers.SerializerMethodField()
    alumniaddress_barangay_id = serializers.SerializerMethodField()

    def get_email(self, obj):
        return obj.user.email if obj.user else None

    def get_jobaddress_country_id(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.country.id:
                    return job_address.country.id
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_province_id(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.province:
                    return job_address.province.id
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_city_id(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.city:
                    return job_address.city.id
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_region_id(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.region:
                    return job_address.region.id
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_jobaddress_barangay_id(self, obj):
        try:
            current_job = obj.currentjob_set.first()
            if current_job:
                job_address = current_job.address
                if job_address and job_address.barangay:
                    return job_address.barangay.id
        except CurrentJob.DoesNotExist:
            pass
        return None

    def get_alumniaddress_country_id(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.country:
                    return alumni_address.country.id
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_province_id(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.province:
                    return alumni_address.province.id
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_city_id(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.city:
                    return alumni_address.city.id
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_region_id(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.region:
                    return alumni_address.region.id
        except AlumniAddress.DoesNotExist:
            pass
        return None

    def get_alumniaddress_barangay_id(self, obj):
        try:
            alumni_address = obj.alumniaddress_set.first()
            if alumni_address:
                if alumni_address.barangay:
                    return alumni_address.barangay.id
        except AlumniAddress.DoesNotExist:
            pass
        return None

    class Meta:
        model = AlumniProfile
        fields = [
            'alumni_id', 'fname', 'lname', 'mi', 'suffix', 'contact_number', 'sex',
            'religion', 'marital_status', 'date_of_birth', 'email', 'jobaddress_country_id',
            'jobaddress_province_id', 'jobaddress_city_id', 'jobaddress_region_id',
            'jobaddress_barangay_id', 'alumniaddress_country_id', 'alumniaddress_province_id',
            'alumniaddress_city_id', 'alumniaddress_region_id', 'alumniaddress_barangay_id',
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