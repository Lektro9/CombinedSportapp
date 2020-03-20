import { gql } from 'apollo-boost';

export const DELETE_OFFLINE_EXENTRY = gql`
  mutation($id: ID!) {
    deleteExerciseEntryOffline(id: $id) @client {
      id
    }
  }
`;

export const DELETE_SERVER_EXENTRY = gql`
  mutation($id: Int!) {
    deleteExerciseEntry(id: $id) {
      retID
    }
  }
`;
