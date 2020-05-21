<template>
  <div>
    <div>Warmup:</div>
    <div v-for="(exercise, index) in exercises" :key="index + 'warm'">
      <div v-if="!exercise.isWorkout">
        {{exercise.numberOfSets}} x
        {{exercise.numberOfReps}}
        {{exercise.exercise ? exercise.exercise.name : ""}}
        {{exercise.markedDeleted ? "del" : ""}}
        <v-btn icon small color="red" v-if="isEdit" @click="deleteExerciseEntry(exercise.id)">
          <v-icon>{{ minusIcon }}</v-icon>
        </v-btn>
      </div>
    </div>
    <v-btn icon small color="green" v-if="isEdit" @click="newEntryFieldWarm = !newEntryFieldWarm">
      <v-icon>{{ plusIcon }}</v-icon>
    </v-btn>
    <v-container fluid>
      <v-row align="center" v-if="newEntryFieldWarm">
        <v-text-field
          :hide-details="true"
          solo
          dense
          class="smallnumber mr-2"
          type="number"
          v-model="newEntryObj.sets"
        ></v-text-field>
        <v-icon class="mr-2">{{ timesIcon }}</v-icon>
        <v-text-field
          :hide-details="true"
          solo
          dense
          class="smallnumber mr-2"
          type="number"
          v-model="newEntryObj.reps"
        ></v-text-field>
        <v-select
          :hide-details="true"
          dense
          item-text="name"
          :items="possibleChoices"
          item-value="id"
          @change="setExName"
          label="Exercise"
          class="mr-2 pa-0"
          solo
          v-model="newEntryObj.exID"
        ></v-select>
        <v-btn icon small @click="createExerciseEntry(false, newEntryObj)">
          <v-icon>{{ checkIcon }}</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <div>Workout:</div>
    <div v-for="(exercise, index) in exercises" :key="index + 'work'">
      <div v-if="exercise.isWorkout">
        {{exercise.numberOfSets}} x
        {{exercise.numberOfReps}}
        {{exercise.exercise ? exercise.exercise.name : ""}}
        {{exercise.markedDeleted ? "del" : ""}}
        <v-btn icon small color="red" v-if="isEdit" @click="deleteExerciseEntry(exercise.id)">
          <v-icon>{{ minusIcon }}</v-icon>
        </v-btn>
      </div>
    </div>
    <v-btn icon small color="green" v-if="isEdit" @click="newEntryFieldWork = !newEntryFieldWork">
      <v-icon>{{ plusIcon }}</v-icon>
    </v-btn>
    <v-container fluid>
      <v-row align="center" v-if="newEntryFieldWork">
        <v-text-field
          :hide-details="true"
          solo
          dense
          class="smallnumber mr-2"
          type="number"
          v-model="newEntryObj.sets"
        ></v-text-field>
        <v-icon class="mr-2">{{ timesIcon }}</v-icon>
        <v-text-field
          :hide-details="true"
          solo
          dense
          class="smallnumber mr-2"
          type="number"
          v-model="newEntryObj.reps"
        ></v-text-field>
        <v-select
          :hide-details="true"
          dense
          item-text="name"
          :items="possibleChoices"
          item-value="id"
          @change="setExName"
          label="Exercise"
          class="mr-2 pa-0"
          solo
          v-model="newEntryObj.exID"
        ></v-select>
        <v-btn icon small @click="createExerciseEntry(true, newEntryObj)">
          <v-icon>{{ checkIcon }}</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiPlus, mdiMinus, mdiClose, mdiCheck } from "@mdi/js";
import { CREATE_EXERCISE_ENTRY } from "../queries/createExerciseEntry.js";
import {
  DELETE_OFFLINE_EXENTRY,
  MARK_DELETE_SERVER_EXENTRY
} from "../queries/deleteExerciseEntry.js";
import { GET_ENTRIES_FROM_CACHE } from "../queries/allSportEntries.js";
export default {
  name: "ActualExercises",
  props: ["exercises", "isEdit", "cardID", "category", "possibleChoices"],
  data: () => ({
    plusIcon: mdiPlus,
    minusIcon: mdiMinus,
    timesIcon: mdiClose,
    checkIcon: mdiCheck,
    newEntryFieldWarm: false,
    newEntryFieldWork: false,
    newEntryObj: { sets: 0, reps: 0, exID: 0, exName: "" }
  }),
  computed: {
    getExerciseName() {
      let names = [];
      for (let name of this.possibleChoices) {
        names.push(name.name);
      }
      return names;
    }
  },
  methods: {
    setExName(id) {
      this.possibleChoices.forEach(choice => {
        if (choice.id == id) {
          this.newEntryObj.exName = choice.name;
        }
      });
      console.log(this.newEntryObj.exName);
    },
    createExerciseEntry(isWorkout, newEntry) {
      this.newEntryFieldWarm = false;
      this.newEntryFieldWork = false;
      console.log(newEntry);
      this.$apollo.mutate({
        mutation: CREATE_EXERCISE_ENTRY,
        variables: {
          work: isWorkout,
          spEn: this.cardID,
          sets: newEntry.sets,
          reps: newEntry.reps,
          exID: newEntry.exID,
          exName: newEntry.exName
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
      }
      // this case is for marking entries to be deleted
      else {
        this.$apollo.mutate({
          mutation: MARK_DELETE_SERVER_EXENTRY,
          variables: {
            id: id
          }
        });
      }
    }
  }
};
</script>

<style lang="css" scoped>
.v-input {
  max-width: 40%;
}

.smallnumber {
  max-width: 10%;
  -webkit-appearance: none;
}
</style>