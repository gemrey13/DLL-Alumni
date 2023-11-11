from django.contrib import admin
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    Department,
    CurrentJob,
    PreviousJob,
    Address,
    Country,
    Region,
    Province,
    City,
    Barangay
)

class AlumniProfileAdmin(admin.ModelAdmin):
    list_display = ['alumni_id', 'fname', 'lname', 'course', 'date_of_birth']

class AddressAdmin(admin.ModelAdmin):
    list_display = ['country', 'region', 'province', 'city', 'barangay']


admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(GraduateInformation)
admin.site.register(Curriculum)
admin.site.register(Course)
admin.site.register(Department)
admin.site.register(CurrentJob)
admin.site.register(PreviousJob)
admin.site.register(Address, AddressAdmin)
admin.site.register(Country)
admin.site.register(Region)
admin.site.register(Province)
admin.site.register(City)
admin.site.register(Barangay)