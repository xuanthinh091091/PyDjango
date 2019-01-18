from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from .models import Question,Employee
from .QuestionSerializer import QuestionSerializer,EmployeeSerializer
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.template import Context, loader
from django.shortcuts import render_to_response

import json


def index(request):
    return render_to_response('index.html')

def getEmployee(request):
    users_list = list()
    employees = Question.objects.raw('select id,name,city from employeeTest')
    for p in employees:  
        users_list.append(EmployeeSerializer(p).data)

    jsondata = list(users_list)
    return JsonResponse(jsondata, safe=False)

@csrf_exempt
def DeleteEmployee(request,id):
    if request.method != 'DELETE':
        return HttpResponse("Method Wrong",status=500)
    try:
        with connection.cursor() as cursor:
                cursor.execute("Delete from employeeTest where id = %s", [id])
    except Exception as error:
        return HttpResponse(error,status=500)
    return HttpResponse("Delete success")

@csrf_exempt
def save_data(request):
  if request.method != 'POST':
    return HttpResponse("Method Wrong",status=500)
  try:
      print("-----------request oh cai dit-------------")
      print(request.body)
      print("-----------json -------------")
      json_data = json.loads(request.body)
      serializer = EmployeeSerializer(data=json_data) 
      print(serializer)
      serializer.is_valid()
      with connection.cursor() as cursor:
            cursor.execute("insert into employeeTest(name,city) values (%s,%s)", (serializer.data['name'],serializer.data['city']))
  except Exception as error:
       return HttpResponse(error,status=500)
  return JsonResponse(json_data, safe=False)