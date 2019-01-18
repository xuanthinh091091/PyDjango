from .models import Question
from .models import Employee
from rest_framework import serializers


class QuestionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    question_text = serializers.CharField(required=False, allow_blank=True, max_length=100)

    def create(self, validated_data):
        return Question.objects.create(**validated_data)

class EmployeeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    city = serializers.CharField(required=False, allow_blank=True, max_length=100)

    def create(self, validated_data):
        return Employee.objects.create(**validated_data)