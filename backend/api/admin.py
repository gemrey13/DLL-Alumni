from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(AlumniProfile)
admin.site.register(GraduateInformation)
admin.site.register(Curriculum)
admin.site.register(Course)
admin.site.register(Department)
admin.site.register(CurrentJob)
admin.site.register(PreviousJob)