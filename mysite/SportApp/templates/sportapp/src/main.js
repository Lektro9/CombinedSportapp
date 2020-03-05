import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import './registerServiceWorker'

export const typeDefs = gql`
  type Item {
    id: ID!
    text: String!
    done: Boolean!
  }
`;

const cache = new InMemoryCache();

async function willCreateProvider() {
  await persistCache({ cache, storage: window.localStorage });
}

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    cache,
    typeDefs,
    resolvers: {}
  })
});

cache.writeData({
  data: {
    todoItems: [
      {
        __typename: 'Item',
        id: 'dqdBHJGgjgjg',
        text: 'test',
        done: true
      }
    ]
  }
});

Vue.config.productionTip = false;

Vue.use(VueApollo);

willCreateProvider().then(() => {
  new Vue({
    vuetify,
    provide: apolloProvider.provide(),
    render: h => h(App)
  }).$mount('#app');
});
