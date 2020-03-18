import { gql } from 'apollo-boost';

export const DELETE_ENTRY = gql`
  mutation($id: Int!) {
    deleteSportEntry(id: $id) {
      ok
    }
  }
`;

export const MARK_DELETE_ENTRY = gql`
  mutation($id: Int!) {
    deleteSportEntry(id: $id) @client {
      ok
    }
  }
`;
