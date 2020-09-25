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
from myapi.views import user, hot, submit, list, search, like, preview_d, collection, collections, mycookie, detail, show, show_detail, sort, admin_sort, admin_eval, admin_give_eval, service, userinfo, userinfoget, count, expert, cancel, audio
from django.views.static import serve
from django.conf import settings
urlpatterns = [
    path('api/user/', user),
    path('api/submit/', submit),
    path('api/eval/', mycookie),
    path('api/detail/', detail),
    path('api/show/', show),
    path('api/show_detail/', show_detail),
    path('api/sort/', sort),
    path('api/admin/sort/', admin_sort),
    path('api/admin/eval/', admin_eval),
    path('api/admin/give_eval/', admin_give_eval),
    path('api/service/', service),
    path('api/userInfo/', userinfo),
    path('api/userInfoGet/', userinfoget),
    path('api/count/', count),
    path('api/admin/expert/', expert),
    path('api/cancel/', cancel),
    path('api/audio/', audio),
    path('api/preview/', preview_d),
    path('api/collections/', collections),
    path('api/collection/', collection),
    path('api/like/', like),
    path('api/search/', search),
    path('api/list/', list),
    path('api/hot/', hot),
    #url(r'api/image/(?P<path>.*)', serve, {'document_root':settings.MEDIA_ROOT}),
]
