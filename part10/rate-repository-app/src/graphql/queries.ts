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
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

const REVIEW_INFO = gql`
  fragment CoreReviewInfo on Review {
    id
    text
    rating
    createdAt
  }
`;

export const GET_REPOSITORY_AND_REVIEWS = gql`
  ${REPOSITORY_INFO}
  ${REVIEW_INFO}
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...CoreRepositoryInfo
      url
      reviews {
        edges {
          node {
            ...CoreReviewInfo
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
