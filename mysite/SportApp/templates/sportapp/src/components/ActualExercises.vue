<template>
  <div>
    <div>Warmup:</div>
    <v-btn icon small color="green" v-if="isEdit">
      <v-icon>{{ plusIcon }}</v-icon>
    </v-btn>
    <div v-for="(exercise, index) in exercises" :key="index + 'warm'">
      <div v-if="!exercise.isWorkout">
        {{exercise.numberOfSets}} x
        {{exercise.numberOfReps}}
        {{exercise.exercise ? exercise.exercise.name : ""}}
      </div>
    </div>
    <div>Workout:</div>
    <div v-for="(exercise, index) in exercises" :key="index + 'work'">
      <div v-if="exercise.isWorkout">
        {{exercise.numberOfSets}} x
        {{exercise.numberOfReps}}
        {{exercise.exercise ? exercise.exercise.name : ""}}
      </div>
    </div>
    <v-btn icon small color="green" v-if="isEdit" @click="createSportEntry()">
      <v-icon>{{ plusIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiPlus } from "@mdi/js";
import { CREATE_EXERCISE_ENTRY } from "../queries/createExerciseEntry.js";
import { GET_ENTRIES_FROM_CACHE } from "../queries/allSportEntries.js";
export default {
  name: "ActualExercises",
  props: ["exercises", "isEdit", "cardID"],
  data: () => ({
    plusIcon: mdiPlus
  }),
  methods: {
    createSportEntry() {
      this.$apollo.mutate({
        mutation: CREATE_EXERCISE_ENTRY,
        variables: {
          work: true,
          spEn: this.cardID
        },
        update: (cache, { data: { createExerciseEntry } }) => {
          const data = cache.readQuery({
            query: GET_ENTRIES_FROM_CACHE
          });
          console.log(data, createExerciseEntry);
          //data.allSporteintrag.push(createExerciseEntryOffline.exerciseEntry);
          data.allSporteintrag.forEach(card => {
            if (card.id === createExerciseEntry.sportEntry.id) {
              card.uebungseintragSet.push(createExerciseEntry);
            }
          });
          cache.writeQuery({
            query: GET_ENTRIES_FROM_CACHE,
            data
          });
        }
      });
    }
  }
};
</script>