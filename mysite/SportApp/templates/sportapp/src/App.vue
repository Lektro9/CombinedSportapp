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
          <v-toolbar-title class="mt-2 text-center">Application</v-toolbar-title>
        </v-col>
        <v-col class="text-right">
          <v-btn icon @click="addCard()">
            <v-icon>{{ plusIcon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-btn text small @click="clearCache()">clear cache</v-btn>
      <v-btn text small @click="fetchDataFromServer()">load serverdata</v-btn>
      <v-btn icon @click="syncCards()">
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
import ExerciseCard from "./components/ExerciseCard";
// import gql from "graphql-tag";
import { CREATE } from "./queries/createSportEntry.js";
import { SYNC_CARD } from "./queries/createSportEntry.js";
import {
  GET_ENTRIES_FROM_CACHE,
  GET_ENTRIES_FROM_SERVER
} from "./queries/allSportEntries.js";
import { DELETE_ENTRY } from "./queries/deleteSportEntry.js";
import { mdiRefresh, mdiPlus } from "@mdi/js";

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
  created() {
    this.$apollo.addSmartQuery("queryOnlineData", {
      query: GET_ENTRIES_FROM_SERVER,
      fetchPolicy: "network-only",
      update: data => data.allSporteintrag,
      skip: true
    });
    console.log(this.allSporteintrag);
  },
  methods: {
    // this is for clearing cache and refetching it from the server (cache could become a problem after too much offline usage)
    clearCache() {
      this.$apollo.queries.queryOnlineData.skip = true;
      Object.values(this.$apollo.provider.clients).forEach(client =>
        client.resetStore()
      );
      this.allSporteintrag = [];
    },
    fetchDataFromServer() {
      this.$apollo.queries.queryOnlineData.skip = false;
      this.$apollo.queries.queryOnlineData.refresh();
    },
    addCard() {
      let nowISOstring = new Date().toISOString();
      this.$apollo
        .mutate({
          mutation: CREATE,
          variables: {
            dateNow: nowISOstring
          },
          update: (cache, { data: { createSportEntryOffline } }) => {
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE
            });
            console.log(data);
            data.allSporteintrag.push(createSportEntryOffline.sportEntry);
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
    },
    syncCards() {
      const offlineCards = this.allSporteintrag.filter(sportEntry => {
        if (sportEntry.id < 0) {
          return sportEntry;
        }
      });
      for (const index in offlineCards) {
        this.$apollo
          .mutate({
            mutation: SYNC_CARD,
            variables: {
              dateNow: offlineCards[index].dateOfEntry
            },
            update: (cache, { data: { createSportEntry } }) => {
              const data = cache.readQuery({
                query: GET_ENTRIES_FROM_SERVER
              });
              data.allSporteintrag = data.allSporteintrag.filter(sportEntry => {
                if (sportEntry.id !== offlineCards[index].id) {
                  return sportEntry;
                }
              });
              data.allSporteintrag.push(createSportEntry.sportEntry);
              cache.writeQuery({
                query: GET_ENTRIES_FROM_SERVER,
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
      let markedDeletedCards = this.allSporteintrag.filter(sportEntry => {
        if (sportEntry.markedDeleted) {
          return sportEntry;
        }
      });
      for (let card of markedDeletedCards) {
        this.$apollo.mutate({
          mutation: DELETE_ENTRY,
          variables: {
            id: card.id
          },
          update: (cache, { data: { deleteSportEntry } }) => {
            // logs 2 times because update gets executed 2 times (optimistic and actual)
            console.log(deleteSportEntry);
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE
            });
            data.allSporteintrag = data.allSporteintrag.filter(e => {
              return e.id !== card.id;
            });
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
        });
      }
    }
  },
  apollo: {
    // Simple query that will update the 'allSporteintrag' vue property
    allSporteintrag: {
      query: GET_ENTRIES_FROM_CACHE,
      fetchPolicy: "cache-first"
    }
  }
};
</script>
