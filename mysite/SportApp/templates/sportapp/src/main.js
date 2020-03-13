import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import ApolloClient from 'apollo-client';
import VueApollo from 'vue-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { persistCache } from 'apollo-cache-persist';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { ApolloLink } from 'apollo-link';
import './registerServiceWorker';

const API_HOST = 'http://192.168.178.29:8000/graphql';
// const SCHEMA_VERSION = '1';
// const SCHEMA_VERSION_KEY = 'apollo-schema-version';

// //building link chain to go through when sending requests

// my goal api
const httpLink = new HttpLink({ uri: API_HOST });
// logic for retrying if connection is troubled
const retryLink = new RetryLink({ attempts: { max: Infinity } });

//logic for queuing requests when offline
const queueLink = new QueueLink();

window.addEventListener('offline', () => queueLink.close());
window.addEventListener('online', () => queueLink.open());

//making sure the stored requests get send in right order
const serializingLink = new SerializingLink();

//tracking the requests and saving them in localstorage
const trackerLink = new ApolloLink((operation, forward) => {
  if (forward === undefined) return null;

  const context = operation.getContext();
  const trackedQueries =
    JSON.parse(window.localStorage.getItem('trackedQueries') || null) || [];

  if (context.tracked !== undefined) {
    const { operationName, query, variables } = operation;

    const newTrackedQuery = {
      query,
      context,
      variables,
      operationName
    };

    window.localStorage.setItem(
      'trackedQueries',
      JSON.stringify([...trackedQueries, newTrackedQuery])
    );
  }

  return forward(operation).map(data => {
    if (context.tracked !== undefined) {
      window.localStorage.setItem(
        'trackedQueries',
        JSON.stringify(trackedQueries)
      );
    }

    return data;
  });
});

// //bringing the whole gang together for an order to go through
const link = ApolloLink.from([
  trackerLink,
  queueLink,
  serializingLink,
  retryLink,
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

// async function willCreateProvider() {
//   await persistCache({ cache, storage: window.localStorage });
// }

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    link,
    cache,
    resolvers: {}
  })
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

// willCreateProvider().then(() => {
new Vue({
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
// });
