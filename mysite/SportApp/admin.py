from django.contrib import admin
from .models import Sporteintrag, Uebung, Kategorie, Uebungseintrag

# Register your models here.

admin.site.register(Sporteintrag)
admin.site.register(Uebung)
admin.site.register(Kategorie)
admin.site.register(Uebungseintrag)
