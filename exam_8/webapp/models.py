from django.db import models

# Create your models here.

class Task(models.Model):

    STATUS_CHOICES = [
        ('Очередь', 'Очередь'),
        ('В работе', 'В работе'),
        ('Сделано', 'Сделано')
    ]

    summary = models.TextField(max_length=100, verbose_name="Краткое описание")
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name="Полное описание")
    due_date = models.DateField(verbose_name="Срок выполнение")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='turn')
    time_planned = models.DecimalField(max_digits=10, decimal_places=1, null=True, blank=True, verbose_name="Планируемое время")


    def __str__(self):
        return "%s %s %s" % (self.summary, self.due_date, self.status)

