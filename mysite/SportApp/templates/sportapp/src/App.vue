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
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row class="grey lighten-5" style="height: 300px;">
              <exerciseCard
                v-for="(exerciseCard, index) in allSporteintrag"
                :key="index"
                :exerciseData="exerciseCard"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ExerciseCard from './components/ExerciseCard';
import gql from 'graphql-tag';
import { CREATE } from './queries/createSportEntry.js';
import { GET_ENTRIES } from './queries/allSportEntries.js';

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
  created() {
    async () => {
      const trackedQueries =
        JSON.parse(window.localStorage.getItem('trackedQueries') || null) || [];

      const promises = trackedQueries.map(
        ({ variables, query, context, operationName }) =>
          this.$apollo.mutate({
            context,
            variables,
            mutation: query,
            update: console.log(operationName),
            optimisticResponse: context.optimisticResponse
          })
      );

      try {
        await Promise.all(promises);
      } catch (error) {
        console.log(error);
      }

      window.localStorage.setItem('trackedQueries', []);
    };
  },
  methods: {
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
                commentOfTheDay: 'optimisticComment',
                uebungseintragSet: [],
                category: {
                  name: 'Pullup',
                  __typename: 'KategorieType'
                },
                __typename: 'SporteintragType'
              },
              __typename: 'CreateSportEntry'
            }
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
