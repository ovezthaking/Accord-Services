from django.urls import path
from . import views


urlpatterns = [
    path('', views.contacts_view),
    path('<int:pk>/', views.contact_view)
]
