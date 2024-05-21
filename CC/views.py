from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.conf import settings
from .models import User

def index(request):

    if request.user.is_authenticated:
        api_key = settings.API_KEY
        return render(
            request, 
            r"CC\index.html", 
            {
                'api_key': api_key
            }
        )
    else:
        return HttpResponseRedirect(
            reverse("login")
        )


def login_view(request):
    if request.method == "POST":

        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
          login(request, user)
          return HttpResponseRedirect(
                reverse("index")
            )
        else:
            return render(
               request, 
               r"CC\login.html", 
               {
                    "message": "Invalid username and/or password."
                }
            )
    else:
        return render(
            request, 
            r"CC\login.html"
        )

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(
        reverse("index")
    )

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request, 
                r"CC\register.html", 
                {
                    "message": "Passwords must match."
                }
            )

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(
            request, 
            r"CC\register.html", 
            {
                    "message": "Username already taken."
                }
            )
        login(request, user)
        return HttpResponseRedirect(
        reverse("index")
        )
    else:
        return render(
            request, 
            r"CC\register.html"
        )

