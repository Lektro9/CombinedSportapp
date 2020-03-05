from django.db import models

# Create your models here.


class Kategorie(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Kategorie"
        verbose_name_plural = "Kategorien"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Kategorie_detail", kwargs={"pk": self.pk})


class Uebung(models.Model):
    category = models.ForeignKey(Kategorie, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    level = models.IntegerField()

    def __str__(self):
        return self.name


class Sporteintrag(models.Model):
    dateOfEntry = models.DateTimeField()
    category = models.ForeignKey(
        Kategorie, on_delete=models.CASCADE, null=True)
    commentOfTheDay = models.CharField(null=True, max_length=500)

    def __str__(self):
        return str(self.dateOfEntry)


class Uebungseintrag(models.Model):
    exercise = models.ForeignKey(
        Uebung, on_delete=models.CASCADE, blank=True, null=True)
    numberOfSets = models.IntegerField(null=True, blank=True)
    numberOfReps = models.IntegerField(null=True, blank=True)
    isWorkout = models.BooleanField(default=False)
    sportEntry = models.ForeignKey(Sporteintrag, on_delete=models.CASCADE)
