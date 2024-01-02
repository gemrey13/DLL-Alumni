# Generated by Django 4.2.7 on 2024-01-02 12:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=80)),
                ('region', models.CharField(blank=True, max_length=80)),
                ('province', models.CharField(blank=True, max_length=80)),
                ('city', models.CharField(blank=True, max_length=80)),
                ('barangay', models.CharField(blank=True, max_length=80)),
                ('zip_code', models.CharField(blank=True, max_length=10)),
                ('address_type', models.CharField(blank=True, max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='AlumniProfile',
            fields=[
                ('alumni_id', models.CharField(max_length=6, primary_key=True, serialize=False)),
                ('fname', models.CharField(max_length=64)),
                ('lname', models.CharField(max_length=64)),
                ('mi', models.CharField(blank=True, max_length=2, null=True)),
                ('sex', models.CharField(max_length=10)),
                ('contact_number', models.CharField(max_length=11)),
                ('religion', models.CharField(max_length=64)),
                ('civil_status', models.CharField(max_length=64)),
                ('date_of_birth', models.DateField()),
                ('facebook_account_name', models.CharField(max_length=80)),
            ],
        ),
        migrations.CreateModel(
            name='Curriculum',
            fields=[
                ('cmo_no', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=64)),
                ('start_year', models.IntegerField()),
                ('end_year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GraduateInformation',
            fields=[
                ('alumni', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.alumniprofile')),
                ('year_graduated', models.IntegerField()),
                ('satisfaction_level', models.IntegerField(blank=True, choices=[(5, 'Very Satisfied'), (4, 'Satisfied'), (3, 'Neutral'), (2, 'Dissatisfied'), (1, 'Very Dissatisfied')], null=True)),
                ('pursued_further_education', models.BooleanField(default=False)),
                ('honor', models.CharField(blank=True, max_length=64, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EmploymentRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=64)),
                ('employment_status', models.CharField(max_length=64)),
                ('approximate_monthly_salary', models.IntegerField()),
                ('date_employed', models.DateField()),
                ('alumni', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employment_record', to='api.alumniprofile')),
            ],
        ),
        migrations.CreateModel(
            name='CurrentJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_position', models.CharField(max_length=64)),
                ('approximate_monthly_salary', models.IntegerField()),
                ('company_affiliation', models.CharField(max_length=64)),
                ('employment_status', models.CharField(max_length=64)),
                ('employed_within_6mo', models.BooleanField(default=False)),
                ('promoted_in_current_job', models.BooleanField(default=False)),
                ('getting_jobs_related_to_experience', models.BooleanField(default=False)),
                ('alumni', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='current_job', to='api.alumniprofile')),
                ('company_address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.address')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('course_name', models.CharField(max_length=64)),
                ('course_desc', models.CharField(max_length=255)),
                ('no_units', models.IntegerField()),
                ('curriculum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api.curriculum')),
            ],
        ),
        migrations.AddField(
            model_name='alumniprofile',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.course'),
        ),
        migrations.AddField(
            model_name='alumniprofile',
            name='home_address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.address'),
        ),
        migrations.AddField(
            model_name='alumniprofile',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
