import { gql } from 'apollo-boost';

export const GET_ENTRIES = gql`
  query {
    allSporteintrag @client {
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
`;

export const GET_ENTRIES_FROM_SERVER = gql`
  query {
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
`;
