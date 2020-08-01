"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from myapi.views import user, submit, download, mycookie, detail, show, show_detail, sort
from django.views.static import serve
from django.conf import settings
urlpatterns = [
    path('api/user/', user),
    path('api/submit/', submit),
    path('api/download/', download),
    path('api/eval/', mycookie),
    path('api/detail/', detail),
    path('api/show/', show),
    path('api/show_detail/', show_detail),
    path('api/sort/', sort),
    url(r'api/image/(?P<path>.*)',serve,{'document_root':settings.MEDIA_ROOT}),
]
