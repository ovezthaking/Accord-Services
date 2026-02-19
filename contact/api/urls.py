from django.urls import path
from . import views


urlpatterns = [
    path('', views.contacts_view),
    path('/<str:pk>/', views.contact_view)
]
