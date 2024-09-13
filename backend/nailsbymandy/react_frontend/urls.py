from . import views # the view responsible for the frontend
from django.urls import re_path

urlpatterns = [
    re_path(r".*", views.index, name="index") # RegExpr: any character is correct # add the view to the url
]