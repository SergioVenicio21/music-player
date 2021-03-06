import os

from django.db import models

from album.models import Album

from dependency_injector.wiring import inject, Provide
from music_player.containers import Container
from shared.file.services.Storage import ABCStorage


@inject
def music_upload(
    instance,
    filename,
    storage: ABCStorage = Provide[Container.file_service]
):
    album = instance.album
    file_name, file_type = os.path.splitext(filename)
    raw_name = ''.join([
        instance.name,
        instance.album.band.name,
        instance.album.band.genre.description,
        file_name
    ])
    path = os.path.join('musics', f'{album.band.name}', f'{album.name}')

    return storage.execute(path, raw_name, file_type)


class Music(models.Model):
    name = models.CharField(max_length=250)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    file = models.FileField(('File'), upload_to=music_upload)
    file_type = models.CharField(max_length=10, blank=True)
    duration = models.DurationField(blank=True, null=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'album': self.album.to_dict(),
            'order': self.order,
            'file': f'/media/{str(self.file)}',
            'file_type': self.file_type,
            'duration': str(self.duration)
        }

    def __str__(self):
        return self.name

    def __repr__(self):
        return f'Music({self.name})'

    class Meta:
        db_table = 'music'
        ordering = ('album', 'order',)
        unique_together = ('album', 'order')
