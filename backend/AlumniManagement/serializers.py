from rest_framework import serializers
from .models import *


class AlumniProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = AlumniProfile
		fields = '__all__'


class AlumniAddressSerializer(serializers.ModelSerializer):
	class Meta:
		model = AlumniAddress
		fields = '__all__'

		