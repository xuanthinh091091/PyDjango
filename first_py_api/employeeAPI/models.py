from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text

    def getAllQues(obj):
        return "thinh"

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)


class Employee(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    def __str__(self):
        return self.name
