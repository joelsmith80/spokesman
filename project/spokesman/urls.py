from django.urls import path, include
from . import views

app_name = 'spokesman'
urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]