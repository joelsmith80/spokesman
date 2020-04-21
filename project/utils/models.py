from django.db import models
from django.conf import settings
import os
import json

# Create your models here.
class Importer(models.Model):

    class Meta:
        abstract = True

    def get_json_file( file ):

        path = settings.APPS_DIR
        data = None

        with open( os.path.join(path,file)) as f:
            data = json.load(f)

        return data