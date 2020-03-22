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
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>{{ plusIcon }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in allKategorie"
                :key="index"
                @click="addCard(item)"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
            :allUebung="allUebung"
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
// import { SYNC_CARD } from "./queries/createSportEntry.js";
import {
  GET_ENTRIES_FROM_CACHE,
  GET_ENTRIES_FROM_SERVER
} from "./queries/allSportEntries.js";
import { DELETE_ENTRY } from "./queries/deleteSportEntry.js";
import { GET_ALLUEBUNG } from "./queries/allUebung.js";
import { CREATE_OR_UPDATE_CARD } from "./queries/createOrUpdateCard.js";
import { GET_ALL_CATEGROIES } from "./queries/allKategorie.js";
import { DELETE_SERVER_EXENTRY } from "./queries/deleteExerciseEntry.js";
import { mdiRefresh, mdiPlus } from "@mdi/js";

window.addEventListener("offline", function() {
  console.log("offline");
});

window.addEventListener("online", function() {
  console.log("online");
});

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
    plusIcon: mdiPlus,
    onlineStatus: window.navigator.onLine
  }),
  created() {
    this.$apollo.addSmartQuery("queryOnlineData", {
      query: GET_ENTRIES_FROM_SERVER,
      fetchPolicy: "network-only",
      update: data => data.allSporteintrag,
      skip: true
    });
    this.$apollo.addSmartQuery("allUebungServer", {
      query: GET_ALLUEBUNG,
      fetchPolicy: "network-only",
      update: data => data.allUebung,
      skip: true
    });
    this.$apollo.addSmartQuery("AllKategorieServer", {
      query: GET_ALL_CATEGROIES,
      fetchPolicy: "network-only",
      update: data => data.allKategorie,
      skip: true
    });
  },
  methods: {
    // this is for clearing cache and refetching it from the server (cache could become a problem after too much offline usage)
    clearCache() {
      this.$apollo.queries.queryOnlineData.skip = true;
      this.$apollo.queries.allUebungServer.skip = true;
      this.$apollo.queries.AllKategorieServer.skip = true;
      Object.values(this.$apollo.provider.clients).forEach(client =>
        client.resetStore()
      );
      this.allSporteintrag = [];
    },
    fetchDataFromServer() {
      this.$apollo.queries.queryOnlineData.skip = false;
      this.$apollo.queries.queryOnlineData.refresh();
      this.$apollo.queries.allUebungServer.skip = false;
      this.$apollo.queries.allUebungServer.refresh();
      this.$apollo.queries.AllKategorieServer.skip = false;
      this.$apollo.queries.AllKategorieServer.refresh();
    },
    addCard(category) {
      let nowISOstring = new Date().toISOString();
      this.$apollo
        .mutate({
          mutation: CREATE,
          variables: {
            dateNow: nowISOstring,
            categoryID: category.id,
            categoryName: category.name
          },
          update: (cache, { data: { createSportEntryOffline } }) => {
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE
            });
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
      let changedCards = this.allSporteintrag.filter(sportEntry => {
        if (sportEntry.id > 0) {
          for (const newSet of sportEntry.uebungseintragSet) {
            if (newSet.id < 0) {
              return sportEntry;
            }
          }
        }
      });
      changedCards = changedCards.map(card => {
        card.uebungseintragSet = card.uebungseintragSet.filter(set => {
          if (set.id < 0) {
            return set;
          }
        });
        return card;
      });
      const newAndChangedCards = offlineCards.concat(changedCards);
      for (const card of newAndChangedCards) {
        this.$apollo
          .mutate({
            mutation: CREATE_OR_UPDATE_CARD,
            variables: {
              sportCard: {
                id: card.id < 0 ? null : card.id,
                createdAt: new Date(card.dateOfEntry).toISOString(),
                comment: card.commentOfTheDay,
                categoryID: card.category.id,
                listOfSets: card.uebungseintragSet.map(set => {
                  return {
                    numberOfSets: set.numberOfSets,
                    numberOfReps: set.numberOfReps,
                    uebungsID: set.exercise.id,
                    workout: set.isWorkout
                  };
                })
              }
            },
            update: (cache, { data: { createOrUpdateCard } }) => {
              const data = cache.readQuery({
                query: GET_ENTRIES_FROM_CACHE
              });
              data.allSporteintrag = data.allSporteintrag.filter(sportEntry => {
                // this is deleting offline cards
                if (sportEntry.id > 0) {
                  return sportEntry;
                }
              });
              if (card.id < 0) {
                data.allSporteintrag.push(
                  createOrUpdateCard.newOrExistingSportCard
                );
              } else {
                data.allSporteintrag.forEach(card => {
                  if (card.id == createOrUpdateCard.newOrExistingSportCard.id) {
                    card.uebungseintragSet =
                      createOrUpdateCard.newOrExistingSportCard.uebungseintragSet;
                  }
                });
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
          update: cache => {
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
      let allExerciseEntries = [];
      this.allSporteintrag.forEach(card => {
        card.uebungseintragSet.forEach(set => {
          allExerciseEntries.push(set);
        });
      });
      allExerciseEntries = allExerciseEntries.filter(ent => {
        if (ent.markedDeleted) {
          return ent;
        }
      });
      for (const ent of allExerciseEntries) {
        this.$apollo.mutate({
          mutation: DELETE_SERVER_EXENTRY,
          variables: {
            id: ent.id
          },
          update: (cache, { data: { deleteExerciseEntry } }) => {
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE
            });
            for (let i in data.allSporteintrag) {
              for (let j in data.allSporteintrag[i].uebungseintragSet) {
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
        });
      }
    }
  },
  apollo: {
    // Simple query that will update the 'allSporteintrag' vue property
    allSporteintrag: {
      query: GET_ENTRIES_FROM_CACHE,
      fetchPolicy: "cache-first"
    },
    allUebung: {
      query: GET_ALLUEBUNG,
      fetchPolicy: "cache-first"
    },
    allKategorie: {
      query: GET_ALL_CATEGROIES,
      fetchPolicy: "cache-first"
    }
  }
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  padding: 0;
}
</style>
