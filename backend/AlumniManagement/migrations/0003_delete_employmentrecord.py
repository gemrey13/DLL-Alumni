# Generated by Django 4.2.2 on 2023-07-19 01:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AlumniManagement', '0002_alter_currentjob_current_job_id'),
    ]

    operations = [
        migrations.DeleteModel(
            name='EmploymentRecord',
        ),
    ]