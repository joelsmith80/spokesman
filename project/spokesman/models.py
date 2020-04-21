from django.db import models

from project.utils.models import Importer

class Helper(models.Model):
    
    class Meta:
        abstract = True

    def get_journo_list():
        
        data = Importer.get_json_file( 'spokesman/import/staff.json' )

        if not data:
            return None

        the_list = []
        for row in data:
            person = row
            person['slug'] = Helper.slugify_name(row['name'])
            the_list.append(person)

        return the_list

    def slugify_name(text):
        return "-".join(text.lower().split())