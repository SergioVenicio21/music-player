# Generated by Django 3.0.2 on 2020-11-02 19:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0002_auto_20201102_1739'),
        ('user', '0002_auto_20201102_1739'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='like',
            unique_together={('user', 'music')},
        ),
    ]
