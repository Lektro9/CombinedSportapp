import { gql } from 'apollo-boost';

export const CREATE = gql`
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
          name
        }
      }
    }
  }
`;
