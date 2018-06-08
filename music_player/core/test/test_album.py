import pytest
import base64
from datetime import datetime
from music_player.core import models
from django.core.files.base import ContentFile
from music_player.core.utils import decode_file


@pytest.mark.django_db(transaction=True)
def test_criacao_genero():
    ano = datetime.now().year
    path = 'music_player/core/test'
    capa = open(path + '/imagem_test.png', 'rb').read()
    b64_capa = base64.b64encode(capa)
    capa = ContentFile(decode_file(b64_capa), 'teste.png')

    genero = models.Genero(descricao='Teste', imagen=capa)
    genero.save()

    banda = models.Banda(nome='Teste', imagen=capa, genero=genero)
    banda.save()

    album = models.Album(
        nome='Teste', banda=banda, capa=capa,
        data_lancamento=ano
    )
    album.save()

    assert isinstance(album.id, int)
    assert 'Teste' == album.nome
    assert album.banda.id == banda.id
    assert album.data_lancamento == ano
    assert album.capa is not None
