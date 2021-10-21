"""lama_logger URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('core.users.urls')),
    path('api/v1/', include('core.stats.urls')),
    path('api/v1/', include('core.calls.urls')),
    path('api/v1/', include('core.projects.urls')),
    path('api-token-auth/', views.obtain_auth_token, name='api-token-auth'),

    path('login/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('registration/', TemplateView.as_view(template_name='index.html'), name='index'),

    path('user/profile/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('user/tokens/', TemplateView.as_view(template_name='index.html'), name='index'),

    path('integrations/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('integrations/<str:language>/', TemplateView.as_view(template_name='index.html'), name='index'),

    path('projects/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('projects/<int:projects_id>/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('projects/<int:projects_id>/reqests/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('projects/<int:projects_id>/reqests/send/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('projects/<int:projects_id>/tracks/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('projects/<int:projects_id>/stats/', TemplateView.as_view(template_name='index.html'), name='index'),
    path('projects/<int:projects_id>/settings/general/', TemplateView.as_view(template_name='index.html'),
         name='index'),
    path('projects/<int:projects_id>/settings/members/', TemplateView.as_view(template_name='index.html'),
         name='index'),
    path('projects/<int:projects_id>/settings/roles/', TemplateView.as_view(template_name='index.html'),
         name='index'),
    path('projects/<int:projects_id>/settings/inbound/', TemplateView.as_view(template_name='index.html'),
         name='index'),
    path('projects/<int:projects_id>/settings/integrations/', TemplateView.as_view(template_name='index.html'),
         name='index'),
    path('projects/<int:projects_id>/settings/filters/', TemplateView.as_view(template_name='index.html'),
         name='index'),
]
