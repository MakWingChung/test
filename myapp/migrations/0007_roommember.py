# Generated by Django 4.2.5 on 2023-10-05 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musker', '0006_profile_facebook_link_profile_homepage_link_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoomMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('uid', models.CharField(max_length=1000)),
                ('room_name', models.CharField(max_length=200)),
                ('insession', models.BooleanField(default=True)),
            ],
        ),
    ]
