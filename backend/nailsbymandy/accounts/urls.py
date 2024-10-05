from django.urls import path
from .views import CheckSuperuserView

urlpatterns = [
    path('get-permissions', CheckSuperuserView.as_view(), name='get_permissions'),
]