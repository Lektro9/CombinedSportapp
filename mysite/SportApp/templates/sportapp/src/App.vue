<template>
  <ApolloQuery :query="require('./queries/allSportEntries.gql').default">
    <template slot-scope="{ result: { loading, error, data } }">
      <h3 v-if="loading">Please wait ...</h3>
      <h3 v-if="error">something went wrong</h3>
      <v-app id="inspire" v-if="data">
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
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-row class="grey lighten-5" style="height: 300px;">
                  <exerciseCard
                    v-for="(exerciseCard, index) in data.allSporteintrag"
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
  </ApolloQuery>
</template>

<script>
import ExerciseCard from "./components/ExerciseCard";
import gql from "graphql-tag";
import CreateSportEntry from "./queries/CreateSportEntry.gql";

export default {
  props: {
    source: String
  },
  components: {
    ExerciseCard
  },
  data: () => ({
    drawer: null,
    exampleData: [
      {
        date: "15.11.2019",
        category: "Pushups",
        warmupSets: "2",
        warmupReps: "10",
        warmupExercise: "Close-Pushups",
        workSets: "2",
        workReps: "5",
        workExercise: "One-Arm-Pushups",
        comment: "quite hard todo, I do not think I am ready for that exercise"
      },
      {
        date: "17.11.2019",
        category: "Pullups",
        warmupSets: "2",
        warmupReps: "10",
        warmupExercise: "Close-Pullups",
        workSets: "2",
        workReps: "15",
        workExercise: "One-Arm-Pullup",
        comment: "is this even possible?"
      }
    ]
  }),
  methods: {
    addCard() {
      this.$apollo.mutate({
        mutation: gql`
          mutation CreateSportEntry {
            createSportEntry {
              sportEntry {
                dateOfEntry
              }
            }
          }
        `
      });
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    allSporteintrag: {
      query: gql`
        {
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
      `,
      update: data => {
        data.allSporteintrag;
        // eslint-disable-next-line no-console
        console.log(data.allSporteintrag);
      }
    }
  }
};
</script>
