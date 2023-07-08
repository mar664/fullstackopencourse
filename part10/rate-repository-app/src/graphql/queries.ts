import { gql } from "@apollo/client";

const REPOSITORY_INFO = gql`
  fragment CoreRepositoryInfo on Repository {
    description
    fullName
    id
    forksCount
    language
    name
    reviewCount
    ratingAverage
    stargazersCount
    ownerAvatarUrl
  }
`;

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_INFO}
  query {
    repositories {
      edges {
        node {
          ...CoreRepositoryInfo
        }
        cursor
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_INFO}
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...CoreRepositoryInfo
      url
    }
  }
`;
