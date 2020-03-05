# Generated by Django 2.2.7 on 2019-11-28 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SportApp', '0003_auto_20191128_0927'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='uebung',
            name='numberOfReps',
        ),
        migrations.RemoveField(
            model_name='uebung',
            name='numberOfSets',
        ),
        migrations.AddField(
            model_name='sporteintrag',
            name='numberOfWarmReps',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sporteintrag',
            name='numberOfWarmSets',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sporteintrag',
            name='numberOfWorkReps',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sporteintrag',
            name='numberOfWorkSets',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
