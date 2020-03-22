import {
  gql
} from 'apollo-boost';

export const CREATE = gql `
  mutation($dateNow: String!, $categoryID: Int!, $categoryName: String!) {
    createSportEntryOffline(createdAt: $dateNow, categoryID: $categoryID, categoryName: $categoryName) @client {
      sportEntry {
        id
        dateOfEntry
        commentOfTheDay
        uebungseintragSet {
          id
        }
        category {
          id
          name
        }
        markedDeleted @client
      }
    }
  }
`;

export const SYNC_CARD = gql `
  mutation($dateNow: String!) {
    createSportEntry(createdAt: $dateNow) {
      sportEntry {
        id
        dateOfEntry
        commentOfTheDay
        uebungseintragSet {
          id
        }
        category {
          id
          name
        }
        markedDeleted @client
      }
    }
  }
`;