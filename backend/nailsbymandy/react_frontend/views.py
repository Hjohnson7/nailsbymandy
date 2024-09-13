from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt



# This is the view that you imported in the frontend/urls.py
@csrf_exempt
def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")  # notice the template used here