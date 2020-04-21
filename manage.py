#!/usr/bin/env python
import os
import sys
import environ 

# use env file to figure out which settings file to load
env = environ.Env()
ENV_DIR = environ.Path()
env_file = str(ENV_DIR.path('.env'))
env.read_env(env_file)
site_environment = env('SITE_ENVIRONMENT')
config_file = 'config.settings.' + site_environment

if __name__ == "__main__":
    
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", config_file)
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        # The above import may fail for some other reason. Ensure that the
        # issue is really that Django is missing to avoid masking other
        # exceptions on Python 2.
        try:
            import django
        except ImportError:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
            )
        raise
    execute_from_command_line(sys.argv)
