import {
  gql
} from 'apollo-boost';

export const CREATE_OR_UPDATE_CARD = gql `
mutation ($sportCard: SportCard!) {
    createOrUpdateCard(sportCard: $sportCard) {
      newOrExistingSportCard {
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
  }
  `;