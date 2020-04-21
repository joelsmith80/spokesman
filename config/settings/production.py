from .base import *

ALLOWED_HOSTS = [
    '207.38.86.214',
    'classics.joelsmith.webfactional.com',
    'fantasycycle.com',
    'vuelta.fantasycycle.com',
    'giro.fantasycycle.com',
    'tour.fantasycycle.com'
]

SESSION_COOKIE_DOMAIN = '.fantasycycle.com'
SESSION_COOKIE_NAME = 'fantasymanagersessionid'

DEFAULT_HOST = 'global'

DEBUG = env.bool('DJANGO_DEBUG',False)
# DEBUG = False

SECRET_KEY = env('DJANGO_SECRET_KEY')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'classics',
        'USER': 'joelsmith',
        'PASSWORD': '@11YourB@se',
        'HOST': 'localhost',
        'PORT': '',
    }
}


EMAIL_BACKEND = 'sendgrid_backend.SendgridBackend'
SENDGRID_API_KEY = env('SENDGRID_API_KEY')
SENDGRID_SANDBOX_MODE_IN_DEBUG = False