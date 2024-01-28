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
    UserProfile,
    UserWorkExperience,
    Language,
    SaveJob,
    News,
    Event,
    EventParticipant,
)


class AlumniProfileAdmin(admin.ModelAdmin):
    list_display = [
        "alumni_id",
        "fname",
        "lname",
        "course",
        "date_of_birth",
        "home_address",
    ]


class AddressAdmin(admin.ModelAdmin):
    list_display = ["country", "region", "province", "city", "barangay"]


class EmploymentRecordAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "alumni",
        "date_employed",
        "approximate_monthly_salary",
        "employment_status",
    ]


class NewsAdmin(admin.ModelAdmin):
    list_display = ["header", "summary", "posted_at"]


admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(GraduateInformation)
admin.site.register(Curriculum)
admin.site.register(Course)
admin.site.register(News, NewsAdmin)
admin.site.register(CurrentJob)
admin.site.register(EmploymentRecord, EmploymentRecordAdmin)
admin.site.register(UserProfile)
admin.site.register(UserSkill)
admin.site.register(UserWorkExperience)
admin.site.register(JobCategory)
admin.site.register(Job)
admin.site.register(Event)
admin.site.register(EventParticipant)
admin.site.register(SaveJob)
admin.site.register(Language)
admin.site.register(JobApplication)
admin.site.register(Address, AddressAdmin)
