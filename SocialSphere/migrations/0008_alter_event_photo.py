# Generated by Django 4.2.14 on 2024-10-16 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocialSphere', '0007_alter_contentmanager_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='photo',
            field=models.BinaryField(),
        ),
    ]