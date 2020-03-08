from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView

# Create your views here.

def index(request):
    return render(request=request, template_name="sportapp/dist/index.html")

def precache(request):
    return render(request=request, template_name="sportapp/dist/" + request.path, content_type='application/javascript')