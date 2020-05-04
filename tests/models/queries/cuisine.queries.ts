import { gql } from 'apollo-server'

export const GET_ALL_CUISINES = gql`
  query {
    getAllCuisines {
      type
      svgName
    }
  }
`
