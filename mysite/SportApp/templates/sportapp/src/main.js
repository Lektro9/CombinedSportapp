import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import ApolloClient from 'apollo-client';
import VueApollo from 'vue-apollo';
import {
  InMemoryCache
} from 'apollo-cache-inmemory';
import {
  persistCache
} from 'apollo-cache-persist';
import {
  HttpLink
} from 'apollo-link-http';
import {
  RetryLink
} from 'apollo-link-retry';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import {
  ApolloLink
} from 'apollo-link';
import {
  gql
} from 'apollo-boost';
import {
  GET_ENTRIES_FROM_CACHE
} from './queries/allSportEntries.js';

import './registerServiceWorker';

const API_HOST = 'http://127.0.0.1:8000/graphql';
// const SCHEMA_VERSION = '1';
// const SCHEMA_VERSION_KEY = 'apollo-schema-version';

// building link chain to go through when sending requests

// my goal api
const httpLink = new HttpLink({
  uri: API_HOST
});

// logic for retrying if connection is troubled
const retryLink = new RetryLink({
  attempts: {
    max: Infinity
  }
});

//logic for queuing requests when offline
const queueLink = new QueueLink();

window.addEventListener('offline', () => queueLink.close());
window.addEventListener('online', () => queueLink.open());

//making sure the stored requests get send in right order
const serializingLink = new SerializingLink();

// //bringing the whole gang together for an order to go through
const link = ApolloLink.from([
  // trackerLink,
  queueLink,
  serializingLink,
  retryLink,
  // errorLink,
  // authLink,
  httpLink
]);

// for clearing out localstorage when new version is available
// const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);

// if (currentVersion === SCHEMA_VERSION) {
//   await persistor.restore();
// } else {
//   await persistor.purge();
//   window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
// }

const cache = new InMemoryCache({
  // dataIdFromObject: object => {
  //   if (object.name) {
  //     return object.name;
  //   }
  //   return object.id;
  // }
});

async function willCreateProvider() {
  await persistCache({
    cache,
    storage: window.localStorage
  });
}

// stuff for locale state
const typeDefs = gql `
  extend type SporteintragType {
    markedDeleted: Boolean
  }
`;

cache.writeData({
  data: {
    allSporteintrag: []
  }
});

const resolvers = {
  Mutation: {
    createSportEntryOffline: (_, {
      createdAt
    }, {
      cache
    }) => {
      // const data = cache.readQuery({ query: GET_ENTRIES_FROM_CACHE });
      console.log(cache);
      const newEntry = {
        createSportEntry: {
          sportEntry: {
            id: -Date.now(),
            dateOfEntry: createdAt,
            commentOfTheDay: 'offlineCreated',
            uebungseintragSet: [],
            category: {
              id: 1,
              name: 'Pushups',
              __typename: 'KategorieType'
            },
            __typename: 'SporteintragType'
          },
          __typename: 'CreateSportEntry'
        }
      };

      //not needed because the return already apends the new card, or maybe it's the update function ...
      //data.allSporteintrag.push(newEntry.createSportEntry.sportEntry);
      //cache.writeQuery({ query: GET_ENTRIES_FROM_CACHE, data });
      return newEntry.createSportEntry;
    },
    deleteSportEntry: (_, {
      id
    }, {
      cache
    }) => {
      const data = cache.readQuery({
        query: GET_ENTRIES_FROM_CACHE
      });
      data.allSporteintrag.forEach(card => {
        if (card.id === id) {
          card.markedDeleted = !card.markedDeleted;
        }
      });
      cache.writeQuery({
        query: GET_ENTRIES_FROM_CACHE,
        data
      });
      return null;
    },
    // throws a "Missing field exerciseEntry" warning which drives me crazy
    createExerciseEntry: (_, {
      isWorkout,
      sportEntryId,
      sets,
      reps,
      exID,
      exName
    }) => {
      let newSet = {
        id: -Date.now(),
        numberOfSets: sets,
        numberOfReps: reps,
        exercise: {
          id: exID,
          name: exName,
          __typename: 'UebungType'
        },
        sportEntry: {
          id: sportEntryId,
          __typename: 'SporteintragType'
        },
        isWorkout: isWorkout,
        __typename: 'UebungseintragType'
      };
      return newSet;
    },
    deleteExerciseEntryOffline: (_, {
      id
    }) => {
      let deletedEntry = {
        id: id,
        __typename: 'notImportant'
      };
      return deletedEntry;
    }
  },
  SporteintragType: {
    markedDeleted() {
      return false;
    }
  }
};

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers
  })
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

willCreateProvider().then(() => {
  new Vue({
    vuetify,
    apolloProvider,
    render: h => h(App)
  }).$mount('#app');
});