# Generated by Django 4.2.7 on 2023-11-11 22:11

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
            name='AlumniProfile',
            fields=[
                ('alumni_id', models.CharField(max_length=6, primary_key=True, serialize=False)),
                ('fname', models.CharField(max_length=64)),
                ('lname', models.CharField(max_length=64)),
                ('mi', models.CharField(blank=True, max_length=2, null=True)),
                ('suffix', models.CharField(blank=True, max_length=3, null=True)),
                ('sex', models.CharField(max_length=10)),
                ('religion', models.CharField(max_length=64)),
                ('marital_status', models.CharField(max_length=64)),
                ('date_of_birth', models.DateField()),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('course_name', models.CharField(max_length=64)),
                ('course_desc', models.CharField(max_length=255)),
                ('field_type', models.CharField(max_length=64)),
                ('no_units', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Curriculum',
            fields=[
                ('cmo_no', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=64)),
                ('curriculum_year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GraduateInformation',
            fields=[
                ('alumni', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.alumniprofile')),
                ('graduation_date', models.DateField()),
                ('honor', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='PreviousJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_type', models.CharField(max_length=64)),
                ('job_title', models.CharField(max_length=64)),
                ('salary', models.IntegerField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('company_name', models.CharField(max_length=64)),
                ('address', models.CharField(blank=True, max_length=255)),
                ('alumni', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.alumniprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department_name', models.CharField(max_length=64)),
                ('curriculum_year', models.DateField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.course')),
            ],
        ),
        migrations.CreateModel(
            name='CurrentJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_type', models.CharField(max_length=64)),
                ('job_title', models.CharField(max_length=64)),
                ('salary', models.IntegerField()),
                ('start_date', models.DateField()),
                ('company_name', models.CharField(max_length=64)),
                ('address', models.CharField(blank=True, max_length=255)),
                ('alumni', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.alumniprofile')),
            ],
        ),
        migrations.AddField(
            model_name='alumniprofile',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.course'),
        ),
        migrations.AddField(
            model_name='alumniprofile',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
