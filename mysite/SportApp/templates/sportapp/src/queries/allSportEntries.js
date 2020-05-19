import {
  gql
} from 'apollo-boost';

export const GET_ENTRIES_FROM_CACHE = gql `
  query {
    allSporteintrag @client {
      id
      dateOfEntry
      commentOfTheDay
      category {
        id
        name
      }
      uebungseintragSet {
        id
        numberOfSets
        numberOfReps
        exercise {
          id
          name
        }
        isWorkout
        markedDeleted @client
      }
      markedDeleted @client
    }
  }
`;

export const GET_ENTRIES_FROM_CACHE_FILTER = gql `
  query ($filter: String) {
    allSporteintragFilter (filter: $filter) @client {
      id
      dateOfEntry
      commentOfTheDay
      category {
        id
        name
      }
      uebungseintragSet {
        id
        numberOfSets
        numberOfReps
        exercise {
          id
          name
        }
        isWorkout
        markedDeleted @client
      }
      markedDeleted @client
    }
  }
`;

export const GET_ENTRIES_FROM_SERVER = gql `
  query {
    allSporteintrag {
      id
      dateOfEntry
      commentOfTheDay
      category {
        id
        name
      }
      uebungseintragSet {
        id
        numberOfSets
        numberOfReps
        exercise {
          id
          name
        }
        isWorkout
        markedDeleted @client
      }
      markedDeleted @client
    }
  }
`;