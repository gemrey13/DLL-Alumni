from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile, News, Event
import os


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(pre_delete, sender=News)
def delete_cover_image(sender, instance, **kwargs):
    if instance.cover_image:
        if os.path.isfile(instance.cover_image.path):
            os.remove(instance.cover_image.path)


@receiver(pre_delete, sender=Event)
def delete_poster_image(sender, instance, **kwargs):
    if instance.poster_image:
        if os.path.isfile(instance.poster_image.path):
            os.remove(instance.poster_image.path)


pre_delete.connect(delete_cover_image, sender=News)
pre_delete.connect(delete_poster_image, sender=Event)
