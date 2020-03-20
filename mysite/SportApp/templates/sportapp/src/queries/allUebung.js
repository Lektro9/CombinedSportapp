import { gql } from 'apollo-boost';

export const GET_ALLUEBUNG = gql`
  query {
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
