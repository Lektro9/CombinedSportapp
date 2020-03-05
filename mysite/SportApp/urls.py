from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('manifest.json', (TemplateView.as_view(template_name="manifest.json", content_type='application/json', )), name='manifest.json'),
    path('icon192.png', (TemplateView.as_view(template_name="icon192.png", content_type='image/png', )), name='icon192.png'),
]
