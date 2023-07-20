from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class AlumniProfileSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()

    def get_email(self, obj):
        return obj.user.email if obj.user else None

    class Meta:
        model = AlumniProfile
        fields = ['alumni_id', 'fname', 'lname', 'mi', 'suffix', 'contact_number', 'sex', 'religion', 'marital_status', 'date_of_birth', 'email']


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
