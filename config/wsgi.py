"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os
import environ
# import sys

from django.core.wsgi import get_wsgi_application

env = environ.Env()
ENV_DIR = environ.Path()
env_file = str(ENV_DIR.path('.env'))
env.read_env(env_file)
site_environment = env('SITE_ENVIRONMENT')
config_file = 'config.settings.' + site_environment

os.environ.setdefault("DJANGO_SETTINGS_MODULE", config_file)

application = get_wsgi_application()
