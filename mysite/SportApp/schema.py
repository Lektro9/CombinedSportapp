import graphene
from django.utils import timezone
from graphene_django.types import DjangoObjectType

from SportApp.models import Sporteintrag, Kategorie, Uebung, Uebungseintrag

# Queries:


class SporteintragType(DjangoObjectType):
    class Meta:
        model = Sporteintrag


class KategorieType(DjangoObjectType):
    class Meta:
        model = Kategorie


class UebungType(DjangoObjectType):
    class Meta:
        model = Uebung


class UebungseintragType(DjangoObjectType):
    class Meta:
        model = Uebungseintrag


class Query(graphene.ObjectType):
    all_Sporteintrag = graphene.List(SporteintragType)
    all_Kategorie = graphene.List(KategorieType)
    all_Uebung = graphene.List(UebungType)
    all_Uebung_Search = graphene.Field(
        lambda: graphene.List(UebungType), categoryName=graphene.String())
    all_Uebungseintrag = graphene.List(UebungseintragType)

    def resolve_all_Sporteintrag(self, info, **kwargs):
        # We can easily optimize query count in the resolve method
        return Sporteintrag.objects.select_related('category').all()

    def resolve_all_Kategorie(self, info, **kwargs):
        return Kategorie.objects.all()

    def resolve_all_Uebung(self, info, **kwargs):
        return Uebung.objects.all()

    def resolve_all_Uebung_Search(self, info, categoryName):
        return Uebung.objects.filter(category__name=categoryName)

    def resolve_all_Uebungseintrag(self, info, **kwargs):
        return Uebungseintrag.objects.all()

# Mutations:


class CreateSportEntry(graphene.Mutation):
    sportEntry = graphene.Field(SporteintragType)

    def mutate(self, info):
        dateNow = timezone.now()
        entry = Sporteintrag(
            dateOfEntry=dateNow.strftime('%Y-%m-%d %H:%M:%S'))
        entry.save()
        # fixes graphQL weird error
        return CreateSportEntry(sportEntry=Sporteintrag.objects.get(pk=entry.pk))


class UpdateSportEntry(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        category_id = graphene.Int(required=False)
        comment = graphene.String(required=False)

    entry = graphene.Field(SporteintragType)

    def mutate(self, info, id, **kwargs):
        category_id = kwargs.get('category_id', None)
        comment = kwargs.get('comment', None)

        entry = Sporteintrag.objects.get(pk=id)

        if category_id is not None:
            entry.category = Kategorie.objects.get(pk=category_id)

        if comment is not None:
            entry.commentOfTheDay = comment

        entry.save()
        return UpdateSportEntry(entry=entry)


class CreateExerciseEntry(graphene.Mutation):
    class Arguments:
        sportEntry_id = graphene.ID()
        isWorkout = graphene.Boolean()

    exerciseEntry = graphene.Field(UebungseintragType)

    def mutate(self, info, sportEntry_id, isWorkout):
        sportEntry = Sporteintrag.objects.get(pk=sportEntry_id)
        exerciseEntry = Uebungseintrag(
            sportEntry=sportEntry, isWorkout=isWorkout)
        exerciseEntry.save()
        return CreateExerciseEntry(exerciseEntry=exerciseEntry)


class UpdateExerciseEntry(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        numberOfSets = graphene.Int()
        numberOfReps = graphene.Int()
        exercise_id = graphene.ID()

    exerciseEntry = graphene.Field(UebungseintragType)

    def mutate(self, info, id, numberOfSets, numberOfReps, exercise_id):
        exerciseEntry = Uebungseintrag.objects.get(pk=id)
        exerciseEntry.numberOfSets = numberOfSets
        exerciseEntry.numberOfReps = numberOfReps
        exerciseEntry.exercise = Uebung.objects.get(pk=exercise_id)
        exerciseEntry.save()
        # Notice we return an instance of this mutation
        return UpdateExerciseEntry(exerciseEntry=exerciseEntry)


class MyMutations(graphene.ObjectType):
    create_sport_entry = CreateSportEntry.Field()
    Update_sport_entry = UpdateSportEntry.Field()
    create_exercise_entry = CreateExerciseEntry.Field()
    update_exercise_entry = UpdateExerciseEntry.Field()


schema = graphene.Schema(query=Query, mutation=MyMutations)
