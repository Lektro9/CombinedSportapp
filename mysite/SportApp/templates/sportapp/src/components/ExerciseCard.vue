/* eslint-disable */
<template>
  <v-card class="ma-3 pa-6" width="300" height="350" elevation="10" raised>
    <!-- TODO: Cool Background image -->
    <v-list-item>
      <v-list-item-content>
        <div class="overline">
          <v-icon>{{ calenderIcon }}</v-icon>
          {{ exerciseData.dateOfEntry }}
        </div>
      </v-list-item-content>

      <v-btn icon @click="isEdit = !isEdit">
        <v-icon>{{ moreIcon }}</v-icon>
      </v-btn>
      <v-btn icon color="red" @click="deleteCard()">
        <v-icon dark>{{ minusIcon }}</v-icon>
      </v-btn>
    </v-list-item>

    <v-card-title v-if="exerciseData.category != null">
      <v-icon large left>{{ muscleIcon }}</v-icon>
      {{ exerciseData.category.name }} {{ exerciseData.id }}
    </v-card-title>

    <!-- <v-card-text
      class="text--primary"
      v-show="!isEdit"
      v-for="(eEntry, index) in exerciseData.uebungseintragSet"
      v-bind:key="index"
    >
      <div
        v-if="eEntry.isWorkout==false"
      >Warmup: {{ eEntry.numberOfSets }} x {{ eEntry.numberOfReps }} {{ eEntry.exercise.name }}</div>
      <div v-if="eEntry.isWorkout==true">
        Workout: {{ eEntry.numberOfSets }} x {{ eEntry.numberOfReps }}
        {{ eEntry.exercise.name }}
      </div>
    </v-card-text>-->

    <v-divider></v-divider>
    <!-- <v-card-text class="text--primary" v-show="!isEdit">
      {{
      exerciseData.commentOfTheDay
      }}
    </v-card-text>-->
    <v-textarea
      v-show="isEdit"
      filled
      auto-grow
      label="Two rows"
      rows="2"
      row-height="20"
    ></v-textarea>
  </v-card>
</template>

<script>
import { GET_ENTRIES } from '../queries/allSportEntries.js';
import { DELETE_ENTRY } from '../queries/deleteSportEntry.js';
import { mdiDotsVertical, mdiMinus, mdiCalendar, mdiArmFlex } from '@mdi/js';

export default {
  name: 'ExerciseCard',
  props: ['exerciseData'],
  data: () => ({
    isEdit: false,
    moreIcon: mdiDotsVertical,
    minusIcon: mdiMinus,
    calenderIcon: mdiCalendar,
    muscleIcon: mdiArmFlex
  }),
  methods: {
    editMethod(index) {
      // eslint-disable-next-line no-console
      console.log(this.$refs.test[index]);
      return this.$refs.test[index];
    },
    deleteCard() {
      let currentID = this.exerciseData.id;
      this.$apollo
        .mutate({
          mutation: DELETE_ENTRY,
          variables: {
            id: currentID
          },
          update: (cache, { data: { deleteSportEntry } }) => {
            // logs 2 times because update gets executed 2 times (optimistic and actual)
            console.log(deleteSportEntry);
            const data = cache.readQuery({
              query: GET_ENTRIES
            });
            data.allSporteintrag = data.allSporteintrag.filter(e => {
              return e.id !== currentID;
            });
            console.log(data);
            cache.writeQuery({
              query: GET_ENTRIES,
              data
            });
          },
          optimisticResponse: {
            deleteSportEntry: {
              ok: true,
              __typename: 'DeleteSportEntry'
            }
          },
          context: {
            serializationKey: 'CARDS'
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
};
</script>

<style>
#styled-input {
  height: 20px;
  font-size: 20pt;
}
.styled-input label[for] {
  height: 20px;
  font-size: 8pt;
  margin: 0px 0px 0px;
}
</style>
