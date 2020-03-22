import {
    gql
} from 'apollo-boost';

export const GET_ALL_CATEGROIES = gql `
query allCats {
  allKategorie {
    id
    name
  }
}
  `;