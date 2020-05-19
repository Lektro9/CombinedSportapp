/* eslint-disable */
<template>
  <v-card class="ma-3 pa-4" width="300" height="350" elevation="10" raised>
    <!-- TODO: Cool Background image -->
    <v-row justify="space-between" class="pa-2">
      <v-icon class="calicon">{{ calenderIcon }}</v-icon>
      <div v-if="!isEdit || exerciseData.id > 0" class="date">
        {{ makeDateReadable() }}
      </div>
      <input
        v-if="isEdit && exerciseData.id < 0"
        type="date"
        v-model="exerciseData.dateOfEntry"
      />

      <v-menu offset-y class="moreicon">
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
    </v-row>
    <!-- <v-btn icon color="red" @click="deleteCard()">
        <v-icon dark>{{ minusIcon }}</v-icon>
    </v-btn>-->

    <v-row justify="center">
      <v-card-title
        v-if="exerciseData.category != null"
        class="pa-0 ma-0"
        justify="center"
      >
        <v-icon large left>{{ muscleIcon }}</v-icon>
        {{ exerciseData.category.name }} {{ exerciseData.id }}
      </v-card-title>
    </v-row>

    <ActualExercises
      :exercises="exerciseData.uebungseintragSet"
      :isEdit="isEdit"
      :cardID="exerciseData.id"
      :category="exerciseData.category"
      :possibleChoices="possibleChoices"
    />

    <v-divider></v-divider>
    <p v-if="exerciseData.markedDeleted === true">will be deleted</p>
    <v-textarea
      v-if="isEdit && exerciseData.id < 0"
      v-model="exerciseData.commentOfTheDay"
      filled
      auto-grow
      label="Two rows"
      rows="2"
      row-height="20"
    ></v-textarea>
    {{ showComment() }}
  </v-card>
</template>

<script>
import ActualExercises from './ActualExercises';
import { GET_ENTRIES_FROM_CACHE } from '../queries/allSportEntries.js';
import {
  DELETE_ENTRY,
  MARK_DELETE_ENTRY,
} from '../queries/deleteSportEntry.js';
import { mdiDotsVertical, mdiMinus, mdiCalendar, mdiArmFlex } from '@mdi/js';

export default {
  name: 'ExerciseCard',
  props: ['exerciseData', 'allUebung'],
  components: {
    ActualExercises,
  },
  data: () => ({
    isEdit: false,
    moreIcon: mdiDotsVertical,
    minusIcon: mdiMinus,
    calenderIcon: mdiCalendar,
    muscleIcon: mdiArmFlex,
    possibleChoices: [],
    readableDate: '',
  }),
  created() {
    this.allUebung.filter((uebung) => {
      if (uebung.category.name === this.exerciseData.category.name) {
        this.possibleChoices.push(uebung);
      }
    });
  },
  computed: {},
  methods: {
    showComment() {
      if (!this.isEdit) {
        return this.exerciseData.commentOfTheDay;
      }
    },
    makeDateReadable() {
      let cardDate = new Date(this.exerciseData.dateOfEntry);
      let dayName = cardDate.toString().split(' ')[0];
      let day = cardDate.getDate();
      let month = cardDate.getMonth() + 1;
      let year = cardDate.getYear() + 1900;
      this.readableDate = dayName + ' ' + day + '.' + month + '.' + year;
      return this.readableDate;
    },
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
          id: currentID,
        },
      });
    },
    deleteCard() {
      let currentID = this.exerciseData.id;
      this.$apollo.mutate({
        mutation: DELETE_ENTRY,
        variables: {
          id: currentID,
        },
        update: (cache, { data: { deleteSportEntry } }) => {
          // logs 2 times because update gets executed 2 times (optimistic and actual)
          console.log(deleteSportEntry);
          const data = cache.readQuery({
            query: GET_ENTRIES_FROM_CACHE,
          });
          data.allSporteintrag = data.allSporteintrag.filter((e) => {
            return e.id !== currentID;
          });
          console.log(data);
          cache.writeQuery({
            query: GET_ENTRIES_FROM_CACHE,
            data,
          });
        },
        optimisticResponse: {
          deleteSportEntry: {
            ok: true,
            __typename: 'DeleteSportEntry',
          },
        },
        context: {
          serializationKey: 'CARDS',
        },
      });
    },
  },
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
.moreicon {
  max-width: 20%;
}

.date {
  max-width: 40%;
}

.calicon {
  max-width: 20%;
}
</style>
