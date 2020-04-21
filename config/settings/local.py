from .base import *

DEBUG = env.bool('DJANGO_DEBUG', default=True)

ALLOWED_HOSTS = [
    'localtest.me',
    'classics.localtest.me',
    'giro.localtest.me',
    'tour.localtest.me',
    'vuelta.localtest.me',
    'admin.localtest.me',
    '127.0.0.1',
    'vuelta.localhost',
    'giro.localhost',
    'tour.localhost'
]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY', default="g7&2l3k)0$tr!=rgrefxo6om@tqz+@340-w*i5*2v(nzm_+zsd")

DEFAULT_HOST = 'global'