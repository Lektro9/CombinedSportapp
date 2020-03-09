import { gql } from 'apollo-boost';

export const CREATE = gql`
  mutation {
    createSportEntry {
      sportEntry {
        dateOfEntry
      }
    }
  }
`;
