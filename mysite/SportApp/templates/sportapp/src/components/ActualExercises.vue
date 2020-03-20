<template>
  <div>
    <div>Warmup:</div>
    <div v-for="(exercise, index) in exercises" :key="index + 'warm'">
      <div v-if="!exercise.isWorkout">
        {{exercise.numberOfSets}} x
        {{exercise.numberOfReps}}
        {{exercise.exercise ? exercise.exercise.name : ""}}
        <v-btn icon small color="red" v-if="isEdit" @click="deleteExerciseEntry(exercise.id)">
          <v-icon>{{ minusIcon }}</v-icon>
        </v-btn>
      </div>
    </div>
    <v-btn icon small color="green" v-if="isEdit" @click="newEntry = !newEntry">
      <v-icon>{{ plusIcon }}</v-icon>
    </v-btn>
    <v-overflow-btn v-if="newEntry" dense :items="getExerciseName" label="Exercise"></v-overflow-btn>
    <div>Workout:</div>
    <div v-for="(exercise, index) in exercises" :key="index + 'work'">
      <div v-if="exercise.isWorkout">
        {{exercise.numberOfSets}} x
        {{exercise.numberOfReps}}
        {{exercise.exercise ? exercise.exercise.name : ""}}
        <v-btn icon small color="red" v-if="isEdit" @click="deleteExerciseEntry(exercise.id)">
          <v-icon>{{ minusIcon }}</v-icon>
        </v-btn>
      </div>
    </div>
    <v-btn icon small color="green" v-if="isEdit" @click="createExerciseEntry(true)">
      <v-icon>{{ plusIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiPlus, mdiMinus } from "@mdi/js";
import { CREATE_EXERCISE_ENTRY } from "../queries/createExerciseEntry.js";
import {
  DELETE_OFFLINE_EXENTRY,
  DELETE_SERVER_EXENTRY
} from "../queries/deleteExerciseEntry.js";
import { GET_ENTRIES_FROM_CACHE } from "../queries/allSportEntries.js";
export default {
  name: "ActualExercises",
  props: ["exercises", "isEdit", "cardID", "category", "possibleChoices"],
  data: () => ({
    plusIcon: mdiPlus,
    minusIcon: mdiMinus,
    newEntry: false
  }),
  computed: {
    getExerciseName() {
      let names = [];
      for (let name of this.possibleChoices) {
        names.push(name.name);
      }
      console.log(names);
      return names;
    }
  },
  methods: {
    createExerciseEntry(isWorkout) {
      this.$apollo.mutate({
        mutation: CREATE_EXERCISE_ENTRY,
        variables: {
          work: isWorkout,
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
    },
    deleteExerciseEntry(id) {
      if (id < 0) {
        this.$apollo.mutate({
          mutation: DELETE_OFFLINE_EXENTRY,
          variables: {
            id: id
          },
          update: (cache, { data: { deleteExerciseEntryOffline } }) => {
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE
            });
            for (let i in data.allSporteintrag) {
              for (let j in data.allSporteintrag[i].uebungseintragSet) {
                if (
                  data.allSporteintrag[i].uebungseintragSet[j].id ===
                  deleteExerciseEntryOffline.id
                ) {
                  data.allSporteintrag[i].uebungseintragSet.splice(j, 1);
                }
              }
            }
            cache.writeQuery({
              query: GET_ENTRIES_FROM_CACHE,
              data
            });
          }
        });
      } else {
        this.$apollo
          .mutate({
            mutation: DELETE_SERVER_EXENTRY,
            variables: {
              id: id
            },
            update: (cache, { data: { deleteExerciseEntry } }) => {
              const data = cache.readQuery({
                query: GET_ENTRIES_FROM_CACHE
              });
              for (let i in data.allSporteintrag) {
                for (let j in data.allSporteintrag[i].uebungseintragSet) {
                  console.log(
                    data.allSporteintrag[i].uebungseintragSet[j].id,
                    deleteExerciseEntry.retID
                  );
                  if (
                    data.allSporteintrag[i].uebungseintragSet[j].id ==
                    deleteExerciseEntry.retID
                  ) {
                    data.allSporteintrag[i].uebungseintragSet.splice(j, 1);
                  }
                }
              }
              cache.writeQuery({
                query: GET_ENTRIES_FROM_CACHE,
                data
              });
            }
          })
          .then(data => {
            // Result
            console.log(data);
          })
          .catch(error => {
            // Error
            console.error(error);
          });
      }
    }
  }
};
</script>

<style lang="css" scoped>
.v-input {
  max-width: 50%;
}
</style>