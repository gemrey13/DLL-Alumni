# Generated by Django 4.2.2 on 2023-07-19 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AlumniManagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currentjob',
            name='current_job_id',
            field=models.CharField(max_length=10, primary_key=True, serialize=False),
        ),
    ]
