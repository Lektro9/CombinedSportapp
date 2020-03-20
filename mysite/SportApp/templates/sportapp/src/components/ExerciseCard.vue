/* eslint-disable */
<template>
  <v-card class="ma-3 pa-6" width="300" height="350" elevation="10" raised>
    <!-- TODO: Cool Background image -->
    <v-list-item-content>
      <div class="overline">
        <v-icon>{{ calenderIcon }}</v-icon>
        {{ exerciseData.dateOfEntry }}
      </div>
    </v-list-item-content>

    <!-- <v-btn icon color="red" @click="deleteCard()">
        <v-icon dark>{{ minusIcon }}</v-icon>
    </v-btn>-->

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>{{ moreIcon }}</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item @click="isEdit = !isEdit">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item @click="markDelete()">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-card-title v-if="exerciseData.category != null">
      <v-icon large left>{{ muscleIcon }}</v-icon>
      {{ exerciseData.category.name }} {{ exerciseData.id }}
    </v-card-title>

    <ActualExercises
      :exercises="exerciseData.uebungseintragSet"
      :isEdit="isEdit"
      :cardID="exerciseData.id"
    />

    <v-divider></v-divider>
    <p v-if="exerciseData.markedDeleted === true">will be deleted</p>
    <v-textarea v-show="isEdit" filled auto-grow label="Two rows" rows="2" row-height="20"></v-textarea>
  </v-card>
</template>

<script>
import ActualExercises from "./ActualExercises";
import { GET_ENTRIES_FROM_CACHE } from "../queries/allSportEntries.js";
import {
  DELETE_ENTRY,
  MARK_DELETE_ENTRY
} from "../queries/deleteSportEntry.js";
import { mdiDotsVertical, mdiMinus, mdiCalendar, mdiArmFlex } from "@mdi/js";

export default {
  name: "ExerciseCard",
  props: ["exerciseData"],
  components: {
    ActualExercises
  },
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
    markDelete() {
      let currentID = this.exerciseData.id;
      this.$apollo.mutate({
        mutation: MARK_DELETE_ENTRY,
        variables: {
          id: currentID
        }
      });
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
              query: GET_ENTRIES_FROM_CACHE
            });
            data.allSporteintrag = data.allSporteintrag.filter(e => {
              return e.id !== currentID;
            });
            console.log(data);
            cache.writeQuery({
              query: GET_ENTRIES_FROM_CACHE,
              data
            });
          },
          optimisticResponse: {
            deleteSportEntry: {
              ok: true,
              __typename: "DeleteSportEntry"
            }
          },
          context: {
            serializationKey: "CARDS"
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
