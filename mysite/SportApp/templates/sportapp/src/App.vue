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
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-btn icon @click="clearCache()">
        <v-icon>mdi-refresh</v-icon>
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
import gql from "graphql-tag";
import { CREATE } from "./queries/createSportEntry.js";
import { GET_ENTRIES } from "./queries/allSportEntries.js";

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
    allSporteintrag: []
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
          },
          optimisticResponse: {
            createSportEntry: {
              sportEntry: {
                id: -1,
                dateOfEntry: nowISOstring,
                commentOfTheDay: "optimisticComment",
                uebungseintragSet: [],
                category: {
                  name: "Pullup",
                  __typename: "KategorieType"
                },
                __typename: "SporteintragType"
              },
              __typename: "CreateSportEntry"
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
  },
  apollo: {
    // Simple query that will update the 'allSporteintrag' vue property
    allSporteintrag: gql`
      query {
        allSporteintrag {
          id
          dateOfEntry
          commentOfTheDay
          category {
            name
          }
          uebungseintragSet {
            numberOfSets
            numberOfReps
            exercise {
              name
            }
            isWorkout
          }
        }
      }
    `
  }
};
</script>
