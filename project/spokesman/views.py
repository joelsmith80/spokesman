from django.shortcuts import render

from .models import Helper

def home(request):

    journoList = Helper.get_journo_list()
    
    content = {
        'journoList': journoList
    }

    return render(request, 'home.html',content)

def about(request):
    return render(request,'about.html')