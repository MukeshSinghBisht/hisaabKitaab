from django.urls import path
from . import views

urlpatterns = [
    path('getPrice/', views.get_price, name='get_price'),
]

