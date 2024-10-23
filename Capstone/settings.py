"""
Django settings for Capstone project.

Generated by 'django-admin startproject' using Django 4.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASE_URL = "postgresql://socialsphere_user:MfMqXV7NI7F4bJOpQvvWDtRS74SrsB8W@dpg-csc8sm5ds78s738ku2k0-a.oregon-postgres.render.com/socialsphere"

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1w$wd8hlmz85cgiybc(cesn3co%ylz0o8invgh32)dt&$lqkvl'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "SocialSphere",
    'django_cron',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_ratelimit.middleware.RatelimitMiddleware', 
    'Capstone.middleware.VisitorCountMiddleware',
    'Capstone.middleware.FreshSessionMiddleware'
]

ROOT_URLCONF = 'Capstone.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Capstone.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases


#DEFAULT SQLITE
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),    }
# }


#trisanjae email
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'railway',
#         'USER': 'postgres',
#         'PASSWORD': 'JQUSUbESEFJsRUYwnbnlGTQhnqdZLEyg',
#         'HOST': 'postgres.railway.internal',
#         'PORT': '5432',
#     }
# }


#github email (THE REAL ONE)
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'railway',
#         'USER': 'postgres',
#         'PASSWORD': 'ViruOZekOCZVQqYVkEdOHZPzDGhCdtmQ',
#         'HOST': 'roundhouse.proxy.rlwy.net',
#         'PORT': '21262',
#     }
# }

#POSTGRES RENDER
DATABASES = {
    "default": dj_database_url.config(default=DATABASE_URL, conn_max_age=1000),
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Manila'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'),]


# STATIC_URL = 'static/'

# STATICFILES_DIRS = ['static']
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#media directory
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


AUTH_USER_MODEL = 'SocialSphere.ContentManager'

#session and for ssl comment
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_AGE = 3600 
SESSION_COOKIE_SECURE = True

USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
#         'LOCATION': 'unique-snowflake',
#     }
# }

#recaptcha
RECAPTCHA_SITE_KEY = os.getenv('RECAPTCHA_SITE_KEY', '6Ld_NFkqAAAAAH_Zq5GLRSBSVHme3y5md8nWd9zs')
RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY', '6Ld_NFkqAAAAAAlQQORxBkBNnUmqY1IbpF4S4O9L')


#CRON
CRON_CLASSES = [
    'SocialSphere.cron.ResetDailyVisitorsCronJob',
]


#PASSWORD RESET
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'socialsphere829@gmail.com'
EMAIL_HOST_PASSWORD = 'cacm xjau zweu ncby'
