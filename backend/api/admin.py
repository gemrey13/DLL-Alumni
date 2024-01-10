from django.contrib import admin
from .models import (
    AlumniProfile,
    GraduateInformation,
    Curriculum,
    Course,
    CurrentJob,
    EmploymentRecord,
    Address,
    Job,
    JobApplication,
    JobCategory,
    UserSkill,
    UserProfile
)

class AlumniProfileAdmin(admin.ModelAdmin):
    list_display = ['alumni_id', 'fname', 'lname', 'course', 'date_of_birth', 'home_address']

class AddressAdmin(admin.ModelAdmin):
    list_display = ['country', 'region', 'province', 'city', 'barangay']

class EmploymentRecordAdmin(admin.ModelAdmin):
    list_display = ['id', 'alumni', 'date_employed', 'approximate_monthly_salary', 'employment_status']

admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(GraduateInformation)
admin.site.register(Curriculum)
admin.site.register(Course)
admin.site.register(CurrentJob)
admin.site.register(EmploymentRecord, EmploymentRecordAdmin)
admin.site.register(UserProfile)
admin.site.register(UserSkill)
admin.site.register(JobCategory)
admin.site.register(Job)
admin.site.register(JobApplication)
admin.site.register(Address, AddressAdmin)