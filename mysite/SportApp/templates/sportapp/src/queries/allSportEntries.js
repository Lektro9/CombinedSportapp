import { gql } from 'apollo-boost';

export const GET_ENTRIES_FROM_CACHE = gql`
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
      }
      markedDeleted @client
    }
  }
`;

export const GET_ENTRIES_FROM_SERVER = gql`
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
      }
      markedDeleted @client
    }
    allUebung {
      id
      name
      level
      category {
        id
        name
      }
    }
  }
`;
