from django.contrib import admin
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    PreviousJob,
    Address,
    Affiliation,
    Certification,
)

class AlumniProfileAdmin(admin.ModelAdmin):
    list_display = ['alumni_id', 'fname', 'lname', 'course', 'date_of_birth', 'address']

class AddressAdmin(admin.ModelAdmin):
    list_display = ['country', 'region', 'province', 'city', 'barangay']

admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(GraduateInformation)
admin.site.register(Curriculum)
admin.site.register(Course)
admin.site.register(CurrentJob)
admin.site.register(PreviousJob)
admin.site.register(Address, AddressAdmin)
admin.site.register(Affiliation)
admin.site.register(Certification)