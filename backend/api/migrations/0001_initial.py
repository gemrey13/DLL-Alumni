# Generated by Django 4.2.7 on 2023-11-14 04:38

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(blank=True, max_length=100, null=True)),
                ('zip_code', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Affiliation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_of_organization', models.CharField(max_length=64)),
                ('position', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='AlumniProfile',
            fields=[
                ('alumni_id', models.CharField(max_length=6, primary_key=True, serialize=False)),
                ('fname', models.CharField(max_length=64)),
                ('lname', models.CharField(max_length=64)),
                ('mi', models.CharField(blank=True, max_length=2, null=True)),
                ('suffix', models.CharField(blank=True, max_length=3, null=True)),
                ('sex', models.CharField(max_length=10)),
                ('contact_number', models.CharField(max_length=11)),
                ('religion', models.CharField(max_length=64)),
                ('marital_status', models.CharField(max_length=64)),
                ('date_of_birth', models.DateField()),
                ('facebook_account_name', models.CharField(max_length=80)),
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.address')),
            ],
        ),
        migrations.CreateModel(
            name='Certification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('date_of_certification', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country_name', models.CharField(max_length=64)),
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
            name='Region',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region_name', models.CharField(max_length=64)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.country')),
            ],
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('province_name', models.CharField(max_length=64)),
                ('region', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.region')),
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
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.address')),
                ('alumni', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.alumniprofile')),
            ],
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, related_name='customuser_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='customuser_set', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', api.models.CustomUserManager()),
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
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.address')),
                ('alumni', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.alumniprofile')),
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
                ('curriculum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api.curriculum')),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city_name', models.CharField(max_length=64)),
                ('province', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.province')),
            ],
        ),
        migrations.CreateModel(
            name='Barangay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barangay_name', models.CharField(max_length=64)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.city')),
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
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.customuser'),
        ),
        migrations.AddField(
            model_name='address',
            name='barangay',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.barangay'),
        ),
        migrations.AddField(
            model_name='address',
            name='city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.city'),
        ),
        migrations.AddField(
            model_name='address',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.country'),
        ),
        migrations.AddField(
            model_name='address',
            name='province',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.province'),
        ),
        migrations.AddField(
            model_name='address',
            name='region',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.region'),
        ),
        migrations.CreateModel(
            name='GraduateInformation',
            fields=[
                ('alumni', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.alumniprofile')),
                ('graduation_date', models.DateField()),
                ('honor', models.CharField(max_length=64)),
                ('affiliation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.affiliation')),
                ('certification', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.certification')),
            ],
        ),
    ]
