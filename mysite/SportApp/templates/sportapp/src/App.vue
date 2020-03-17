<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" dark>
      <v-row justify="space-between">
        <v-col>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        </v-col>
        <v-col>
          <v-toolbar-title class="mt-2 text-center"
            >Application</v-toolbar-title
          >
        </v-col>
        <v-col class="text-right">
          <v-btn icon @click="addCard()">
            <v-icon>{{ plusIcon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-btn icon @click="clearCache()">
        <v-icon>{{ refreshIcon }}</v-icon>
      </v-btn>
      <v-btn icon @click="syncCards()">
        <v-icon>{{ refreshIcon }}</v-icon>
      </v-btn>
      <v-btn icon @click="queryCache()">
        <v-icon>{{ refreshIcon }}</v-icon>
      </v-btn>
      <v-container fluid>
        <v-row class="grey lighten-5">
          <exerciseCard
            v-for="(exerciseCard, index) in allSporteintrag"
            :key="index"
            :exerciseData="exerciseCard"
          />
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ExerciseCard from './components/ExerciseCard';
// import gql from "graphql-tag";
import { CREATE } from './queries/createSportEntry.js';
import { SYNC_CARD } from './queries/createSportEntry.js';
import {
  GET_ENTRIES,
  GET_ENTRIES_FROM_SERVER
} from './queries/allSportEntries.js';
import { mdiRefresh, mdiPlus } from '@mdi/js';

export default {
  props: {
    source: String
  },
  components: {
    ExerciseCard
  },
  data: () => ({
    drawer: null,
    exampleData: [],
    allSporteintrag: [],
    refreshIcon: mdiRefresh,
    plusIcon: mdiPlus
  }),
  created() {},
  methods: {
    // this is for clearing cache and refetching it from the server (cache could become a problem after too much offline usage)
    clearCache() {
      Object.values(this.$apollo.provider.clients).forEach(client =>
        client.cache.reset()
      );
      // this.allSporteintrag = [];
      this.$apollo.queries.allSporteintrag.refresh();
    },
    addCard() {
      let nowISOstring = new Date().toISOString();
      this.$apollo
        .mutate({
          mutation: CREATE,
          variables: {
            dateNow: nowISOstring
          },
          update: (cache, { data: { createSportEntry } }) => {
            const data = cache.readQuery({
              query: GET_ENTRIES
            });
            data.allSporteintrag.push(createSportEntry.sportEntry);
            cache.writeQuery({
              query: GET_ENTRIES,
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
    },
    syncCards() {
      const offlineCards = this.allSporteintrag.filter(sportEntry => {
        if (sportEntry.id < 0) {
          return sportEntry;
        }
      });
      console.log(offlineCards);
      for (const index in offlineCards) {
        this.$apollo
          .mutate({
            mutation: SYNC_CARD,
            variables: {
              dateNow: offlineCards[index].dateOfEntry
            },
            update: (cache, { data: { createSportEntry } }) => {
              const data = cache.readQuery({
                query: GET_ENTRIES
              });
              data.allSporteintrag = data.allSporteintrag.filter(sportEntry => {
                if (sportEntry.id !== offlineCards[index].id) {
                  return sportEntry;
                }
              });
              data.allSporteintrag.push(createSportEntry.sportEntry);
              cache.writeQuery({
                query: GET_ENTRIES,
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
  },
  apollo: {
    // Simple query that will update the 'allSporteintrag' vue property
    allSporteintrag: {
      query: GET_ENTRIES,
      fetchPolicy: 'cache-first'
    },
    allSporteintragOnline: {
      query: GET_ENTRIES_FROM_SERVER,
      update: data => data.allSporteintrag
    }
  }
};
</script>
