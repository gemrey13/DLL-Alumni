from rest_framework import serializers
from .models import *


class AlumniProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = AlumniProfile
		fields = '__all__'