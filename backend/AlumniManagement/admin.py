from django.contrib import admin
from .models import *


admin.site.register(Curriculum)
admin.site.register(Course)
admin.site.register(CurrentJob)
admin.site.register(AlumniProfile)
admin.site.register(PreviousJob)
admin.site.register(Graduate)
admin.site.register(Country)
admin.site.register(Province)
admin.site.register(City)
admin.site.register(Barangay)
admin.site.register(JobAddress)
admin.site.register(AlumniAddress)
admin.site.register(Region)



# from AlumniManagement.models import JobAddress, PreviousJob

# job_address_ids = PreviousJob.objects.values_list('address_id', flat=True)

# JobAddress.objects.filter(id__in=job_address_ids).delete()
