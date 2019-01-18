from django.urls import path

from . import views

urlpatterns = [
    path('/test', views.index, name='index'),
    path('', views.getEmployee, name='employee'),
    path('/save', views.save_data, name='save_data'),
    path('/delete/<int:id>', views.DeleteEmployee, name='DeleteEmployee'),
]