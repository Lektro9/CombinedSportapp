import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import ApolloClient from 'apollo-client';
import VueApollo from 'vue-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { ApolloLink } from 'apollo-link';
import { gql } from 'apollo-boost';
import { GET_ENTRIES_FROM_CACHE } from './queries/allSportEntries.js';

import './registerServiceWorker';

const API_HOST = 'http://192.168.178.29:1337/graphql';

// building link chain to go through when sending requests

// my goal api
const httpLink = new HttpLink({
  uri: API_HOST,
});

// logic for retrying if connection is troubled
const retryLink = new RetryLink({
  attempts: {
    max: Infinity,
  },
});

//logic for queuing requests when offline
const queueLink = new QueueLink();

window.addEventListener('offline', () => queueLink.close());
window.addEventListener('online', () => queueLink.open());

//making sure the stored requests get send in right order
const serializingLink = new SerializingLink();

// //bringing the whole gang together for an order to go through
const link = ApolloLink.from([queueLink, serializingLink, retryLink, httpLink]);

const cache = new InMemoryCache({});

async function willCreateProvider() {
  await persistCache({
    cache,
    storage: window.localStorage,
  });
}

// stuff for locale state
const typeDefs = gql`
  extend type SporteintragType {
    markedDeleted: Boolean
  }
  extend type UebungseintragType {
    markedDeleted: Boolean
  }
`;

cache.writeData({
  data: {
    allSporteintrag: [],
  },
});

const resolvers = {
  Query: {
    allSporteintragFilter: (_, { filter }, { cache }) => {
      const data = cache.readQuery({
        query: GET_ENTRIES_FROM_CACHE,
      });
      const filteredEntries = data.allSporteintrag.filter((card) => {
        if (card.category.name === filter) {
          return card;
        }
      });
      return filteredEntries;
    },
  },
  Mutation: {
    createSportEntryOffline: (_, { createdAt, categoryID, categoryName }) => {
      // const data = cache.readQuery({ query: GET_ENTRIES_FROM_CACHE });
      const newEntry = {
        createSportEntry: {
          sportEntry: {
            id: -Date.now(),
            dateOfEntry: createdAt,
            commentOfTheDay: '',
            uebungseintragSet: [],
            category: {
              id: categoryID,
              name: categoryName,
              __typename: 'KategorieType',
            },
            __typename: 'SporteintragType',
          },
          __typename: 'CreateSportEntry',
        },
      };

      //not needed because the return already apends the new card, or maybe it's the update function ...
      //data.allSporteintrag.push(newEntry.createSportEntry.sportEntry);
      //cache.writeQuery({ query: GET_ENTRIES_FROM_CACHE, data });
      return newEntry.createSportEntry;
    },
    deleteSportEntry: (_, { id }, { cache }) => {
      const data = cache.readQuery({
        query: GET_ENTRIES_FROM_CACHE,
      });
      data.allSporteintrag.forEach((card) => {
        if (card.id === id) {
          card.markedDeleted = !card.markedDeleted;
        }
      });
      cache.writeQuery({
        query: GET_ENTRIES_FROM_CACHE,
        data,
      });
      return null;
    },
    // throws a "Missing field exerciseEntry" warning which drives me crazy
    createExerciseEntry: (
      _,
      { isWorkout, sportEntryId, sets, reps, exID, exName }
    ) => {
      let newSet = {
        id: -Date.now(),
        numberOfSets: sets,
        numberOfReps: reps,
        exercise: {
          id: exID,
          name: exName,
          __typename: 'UebungType',
        },
        sportEntry: {
          id: sportEntryId,
          __typename: 'SporteintragType',
        },
        isWorkout: isWorkout,
        __typename: 'UebungseintragType',
      };
      return newSet;
    },
    deleteExerciseEntryOffline: (_, { id }) => {
      let deletedEntry = {
        id: id,
        __typename: 'notImportant',
      };
      return deletedEntry;
    },
    markDeleteExerciseEntry: (_, { id }, { cache }) => {
      const data = cache.readQuery({
        query: GET_ENTRIES_FROM_CACHE,
      });
      data.allSporteintrag.forEach((card) => {
        card.uebungseintragSet.forEach((set) => {
          if (set.id === id) {
            set.markedDeleted = !set.markedDeleted;
          }
        });
      });
      cache.writeQuery({
        query: GET_ENTRIES_FROM_CACHE,
        data,
      });
      return null;
    },
  },
  SporteintragType: {
    markedDeleted() {
      return false;
    },
  },
  UebungseintragType: {
    markedDeleted() {
      return false;
    },
  },
};

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers,
  }),
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

// register jw pagination component globally
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

willCreateProvider().then(() => {
  new Vue({
    vuetify,
    apolloProvider,
    render: (h) => h(App),
  }).$mount('#app');
});
