from django.shortcuts import render

def signup(request):
    return render(request, 'accounts/signup.html')

def login_check(request):
    return render(request, 'accounts/login.html') 