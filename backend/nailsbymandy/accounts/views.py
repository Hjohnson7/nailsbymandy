from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import UserAccount
import json
# Create your views here.

class CheckSuperuserView(View):
    """
    Class-based view to check if the authenticated user is a superuser.
    Returns a JSON response with the superuser status.
    """
    def get(self, request, *args, **kwargs):
        user_email = request.user
        user = UserAccount.objects.get(email=user_email)
        is_superuser = user.is_superuser
        return JsonResponse({'is_superuser': is_superuser}, status=200, safe=False)