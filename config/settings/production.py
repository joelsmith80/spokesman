from .base import *

ALLOWED_HOSTS = [
    '207.38.86.214',
    'http://jps-spokesman.herokuapp.com/',
    '127.0.0.1',
    'localhost',
]

DEBUG = env.bool('DJANGO_DEBUG',False)
# DEBUG = False

SECRET_KEY = env('DJANGO_SECRET_KEY')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dek82no2ghlt4i',
        'USER': 'oiawduovfrllgv',
        'PASSWORD': 'b0eb42d04d96d84aa056ce372dc5925b2a557a52488a3a12672eb61b16934720',
        'HOST': 'ec2-18-206-84-251.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'