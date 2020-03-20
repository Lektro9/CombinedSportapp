import { gql } from 'apollo-boost';

export const CREATE = gql`
  mutation($dateNow: String!) {
    createSportEntryOffline(createdAt: $dateNow) @client {
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

export const SYNC_CARD = gql`
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
