# Generated by Django 4.2.5 on 2024-06-02 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SocialSphere', '0002_eventstats_alter_contentmanager_options_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='photo_or_video',
            new_name='photo',
        ),
    ]