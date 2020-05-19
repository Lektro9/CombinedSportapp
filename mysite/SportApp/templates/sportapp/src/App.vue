<template>
  <v-app id="inspire">
    <v-snackbar v-model="snackbar" color="warning" :timeout="6000" :top="true">
      You are currently not online.
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-app-bar app color="blue" dark>
      <v-row justify="space-between">
        <v-col>
          <v-btn text @click="dialog = true">open guide</v-btn>
        </v-col>
        <v-col>
          <v-toolbar-title class="mt-2 text-center"
            >Application</v-toolbar-title
          >
        </v-col>
        <v-col class="text-right">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-row justify="center">
                <v-dialog v-model="dialog" width="600px">
                  <guideModal @closeModal="dialog = false" />
                </v-dialog>
              </v-row>
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
      <v-offline
        online-class="online"
        offline-class="offline"
        @detected-condition="amIOnline"
      >
      </v-offline>

      <v-btn text small @click="clearCache()">clear cache</v-btn>
      <v-btn text small @click="fetchDataFromServer()">load serverdata</v-btn>
      <v-btn
        icon
        @click="syncCards()"
        :disabled="!this.onLine && this.filtered"
      >
        <v-icon>{{ refreshIcon }}</v-icon>
      </v-btn>
      <v-btn text small @click="resetFilter()">deactivate filter</v-btn>
      <v-select
        v-model="filter"
        :items="
          allKategorie.map((category) => {
            return category.name;
          })
        "
        @input="setFilter()"
        label="Standard"
      ></v-select>
      <v-container fluid>
        <v-row class="grey lighten-5 justify-center">
          <exerciseCard
            v-for="(exerciseCard, index) in pageOfItems"
            :key="index"
            :exerciseData="exerciseCard"
            :allUebung="allUebung"
          />
        </v-row>
        <jw-pagination
          :items="filtered ? allSporteintragFilter : allSporteintrag"
          @changePage="onChangePage"
        ></jw-pagination>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ExerciseCard from './components/ExerciseCard';
import { CREATE } from './queries/createSportEntry.js';
import {
  GET_ENTRIES_FROM_CACHE,
  GET_ENTRIES_FROM_SERVER,
  GET_ENTRIES_FROM_CACHE_FILTER,
} from './queries/allSportEntries.js';
import { DELETE_ENTRY } from './queries/deleteSportEntry.js';
import { GET_ALLUEBUNG } from './queries/allUebung.js';
import { CREATE_OR_UPDATE_CARD } from './queries/createOrUpdateCard.js';
import { GET_ALL_CATEGROIES } from './queries/allKategorie.js';
import { DELETE_SERVER_EXENTRY } from './queries/deleteExerciseEntry.js';
import { mdiRefresh, mdiPlus } from '@mdi/js';
import VOffline from 'v-offline';
import guideModal from './components/GuideModal.vue';

export default {
  props: {
    source: String,
  },
  components: {
    ExerciseCard,
    VOffline,
    guideModal,
  },
  data: () => ({
    drawer: null,
    exampleData: [],
    allSporteintrag: [],
    allSporteintragFilter: [],
    refreshIcon: mdiRefresh,
    plusIcon: mdiPlus,
    pageOfItems: [],
    filtered: false,
    filter: '',
    onLine: null,
    onlineSlot: 'online',
    offlineSlot: 'offline',
    snackbar: false,
    dialog: false,
  }),
  created() {
    this.$apollo.addSmartQuery('queryOnlineData', {
      query: GET_ENTRIES_FROM_SERVER,
      fetchPolicy: 'network-only',
      update: (data) => data.allSporteintrag,
      skip: true,
    });
    this.$apollo.addSmartQuery('allUebungServer', {
      query: GET_ALLUEBUNG,
      fetchPolicy: 'network-only',
      update: (data) => data.allUebung,
      skip: true,
    });
    this.$apollo.addSmartQuery('AllKategorieServer', {
      query: GET_ALL_CATEGROIES,
      fetchPolicy: 'network-only',
      update: (data) => data.allKategorie,
      skip: true,
    });
    this.$apollo.addSmartQuery('AllFilteredEntries', {
      query: GET_ENTRIES_FROM_CACHE_FILTER,
      fetchPolicy: 'network-only',
      update: (data) => data.allSporteintragFilter,
      skip: true,
    });
  },
  computed: {},
  methods: {
    amIOnline(e) {
      this.onLine = e;
      if (!this.onLine) this.snackbar = true;
    },
    resetFilter() {
      this.filtered = false;
      this.filter = '';
    },
    setFilter() {
      this.filtered = true;
      this.$apollo.queries.allSporteintragFilter.refetch({
        filter: this.filter,
      });
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    // this is for clearing cache and refetching it from the server (cache could become a problem after too much offline usage)
    clearCache() {
      // this.$apollo.queries.queryOnlineData.skip = true;
      // this.$apollo.queries.allUebungServer.skip = true;
      // this.$apollo.queries.AllKategorieServer.skip = true;
      // this.$apollo.queries.AllFilteredEntries.skip = true;
      // Object.values(this.$apollo.provider.clients).forEach((client) =>
      //   client.resetStore().then(() => {
      //     this.allSporteintrag = [];
      //     // this.fetchDataFromServer();
      //   })
      // );
      window.localStorage.clear();
      window.location.reload();
    },
    fetchDataFromServer() {
      this.$apollo.queries.queryOnlineData.skip = false;
      this.$apollo.queries.queryOnlineData.refresh();
      this.$apollo.queries.allUebungServer.skip = false;
      this.$apollo.queries.allUebungServer.refresh();
      this.$apollo.queries.AllKategorieServer.skip = false;
      this.$apollo.queries.AllKategorieServer.refresh();
      this.$apollo.queries.AllFilteredEntries.skip = false;
      this.$apollo.queries.AllFilteredEntries.refresh();
    },
    addCard(category) {
      let nowISOstring = new Date().toISOString();
      this.$apollo
        .mutate({
          mutation: CREATE,
          variables: {
            dateNow: nowISOstring,
            categoryID: category.id,
            categoryName: category.name,
          },
          update: (cache, { data: { createSportEntryOffline } }) => {
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE,
            });
            data.allSporteintrag.unshift(createSportEntryOffline.sportEntry);
            cache.writeQuery({
              query: GET_ENTRIES_FROM_CACHE,
              data,
            });
          },
        })
        .then(() => {
          // Result
          if (this.filtered) this.setFilter();
        })
        .catch((error) => {
          // Error
          console.error(error);
        });
    },
    syncCards() {
      const offlineCards = this.allSporteintrag.filter((sportEntry) => {
        if (sportEntry.id < 0) {
          return sportEntry;
        }
      });
      let changedCards = this.allSporteintrag.filter((sportEntry) => {
        if (sportEntry.id > 0) {
          for (const newSet of sportEntry.uebungseintragSet) {
            if (newSet.id < 0) {
              return sportEntry;
            }
          }
        }
      });
      changedCards = changedCards.map((card) => {
        card.uebungseintragSet = card.uebungseintragSet.filter((set) => {
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
                listOfSets: card.uebungseintragSet.map((set) => {
                  return {
                    numberOfSets: set.numberOfSets,
                    numberOfReps: set.numberOfReps,
                    uebungsID: set.exercise.id,
                    workout: set.isWorkout,
                  };
                }),
              },
            },
            update: (cache, { data: { createOrUpdateCard } }) => {
              const data = cache.readQuery({
                query: GET_ENTRIES_FROM_CACHE,
              });
              data.allSporteintrag = data.allSporteintrag.filter(
                (sportEntry) => {
                  // this is deleting offline cards
                  if (sportEntry.id > 0) {
                    return sportEntry;
                  }
                }
              );
              if (card.id < 0) {
                data.allSporteintrag.push(
                  createOrUpdateCard.newOrExistingSportCard
                );
              } else {
                data.allSporteintrag.forEach((card) => {
                  if (card.id == createOrUpdateCard.newOrExistingSportCard.id) {
                    card.uebungseintragSet =
                      createOrUpdateCard.newOrExistingSportCard.uebungseintragSet;
                  }
                });
              }
              cache.writeQuery({
                query: GET_ENTRIES_FROM_CACHE,
                data,
              });
            },
          })
          .then(() => {
            if (this.filtered) this.setFilter();
          })
          .catch((error) => {
            // Error
            console.error(error);
          });
      }
      let markedDeletedCards = this.allSporteintrag.filter((sportEntry) => {
        if (sportEntry.markedDeleted) {
          return sportEntry;
        }
      });
      for (let card of markedDeletedCards) {
        this.$apollo.mutate({
          mutation: DELETE_ENTRY,
          variables: {
            id: card.id,
          },
          update: (cache) => {
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE,
            });
            data.allSporteintrag = data.allSporteintrag.filter((e) => {
              return e.id !== card.id;
            });
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
      }
      let allExerciseEntries = [];
      this.allSporteintrag.forEach((card) => {
        card.uebungseintragSet.forEach((set) => {
          allExerciseEntries.push(set);
        });
      });
      allExerciseEntries = allExerciseEntries.filter((ent) => {
        if (ent.markedDeleted) {
          return ent;
        }
      });
      for (const ent of allExerciseEntries) {
        this.$apollo.mutate({
          mutation: DELETE_SERVER_EXENTRY,
          variables: {
            id: ent.id,
          },
          update: (cache, { data: { deleteExerciseEntry } }) => {
            const data = cache.readQuery({
              query: GET_ENTRIES_FROM_CACHE,
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
              data,
            });
          },
        });
      }
      console.log('here I have to fetch every query again imo');
      this.fetchDataFromServer();
    },
  },
  apollo: {
    // Simple query that will update the 'allSporteintrag' vue property
    allSporteintrag: {
      query: GET_ENTRIES_FROM_CACHE,
      fetchPolicy: 'cache-first',
    },
    allSporteintragFilter: {
      query: GET_ENTRIES_FROM_CACHE_FILTER,
      variables: { filter: 'Pushups' },
      fetchPolicy: 'cache-first',
    },
    allUebung: {
      query: GET_ALLUEBUNG,
      fetchPolicy: 'cache-first',
    },
    allKategorie: {
      query: GET_ALL_CATEGROIES,
      fetchPolicy: 'cache-first',
    },
  },
};
</script>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  padding: 0;
}
.offline {
  background-color: #fc9842;
  background-image: linear-gradient(315deg, #fc9842 0%, #fe5f75 74%);
}
.online {
  background-color: #00b712;
  background-image: linear-gradient(315deg, #00b712 0%, #5aff15 74%);
}
</style>
