# Generated by Django 3.0.2 on 2020-11-02 17:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('band', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='band',
            table='band',
        ),
        migrations.AlterModelTable(
            name='genre',
            table='genre',
        ),
    ]