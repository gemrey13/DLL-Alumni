from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import CurrentJob, PreviousJob
from datetime import date

@receiver(pre_delete, sender=CurrentJob)
def move_to_previous_job(sender, instance, **kwargs):
    previous_job = PreviousJob(
        previous_job_id=instance.current_job_id,
        job_title=instance.job_title,
        salary=instance.salary,
        start_date=instance.start_date,
        end_date=date.today(),
        company_name=instance.company_name,
        alumni=instance.alumni,
        country=instance.country,
        province=instance.province,
        city=instance.city,
        barangay=instance.barangay
    )
    previous_job.save()