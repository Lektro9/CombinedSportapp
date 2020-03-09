import { gql } from 'apollo-boost';

export const GET_ENTRIES = gql`
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
