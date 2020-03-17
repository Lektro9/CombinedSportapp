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
import { GET_ENTRIES } from './queries/allSportEntries.js';

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
  dataIdFromObject: object => object.id
});

async function willCreateProvider() {
  await persistCache({
    cache,
    storage: window.localStorage
  });
}

// stuff for locale state
const typeDefs = gql`
  type allSporteintrag {
    id: ID!
    dateOfEntry: String!
    commentOfTheDay: String!
    category: String
    uebungseintragSet: [String]
  }
  # type category {
  #   id: ID!
  #   name: String!
  # }
  # type uebungseintragSet {
  #   id: ID!
  #   numberOfSets: Int!
  #   numberOfReps: Int!
  #   exercise: exercise
  #   isWorkout: Boolean!
  # }
  # type exercise {
  #   id: ID!
  #   name: String!
  #   level: Int!
  # }
  # type Mutation {
  #   createSportEntry(dateNow: String!): allSporteintrag
  # }
`;

cache.writeData({
  data: {
    allSporteintrag: []
  }
});

const resolvers = {
  Mutation: {
    createSportEntry: (_, { createdAt }, { cache }) => {
      const data = cache.readQuery({ query: GET_ENTRIES });
      const newEntry = {
        createSportEntry: {
          sportEntry: {
            id: -Date.now(),
            dateOfEntry: createdAt,
            commentOfTheDay: 'offlineCreated',
            uebungseintragSet: [],
            category: {
              name: 'Pullup-offline',
              __typename: 'KategorieType'
            },
            __typename: 'SporteintragType'
          },
          __typename: 'CreateSportEntry'
        }
      };
      //not needed because the return already apends the new card
      //data.allSporteintrag.push(newEntry.createSportEntry.sportEntry);
      cache.writeQuery({ query: GET_ENTRIES, data });
      return newEntry.createSportEntry;
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
