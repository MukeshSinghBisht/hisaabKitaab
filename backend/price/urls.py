from django.urls import path
from . import views

urlpatterns = [
    path('getPrice/<str:item_name>/', views.get_price, name='get_price'),
]
