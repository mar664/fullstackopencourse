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
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...CoreRepositoryInfo
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
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

export const GET_CURRENT_USER = gql`
  ${REVIEW_INFO}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...CoreReviewInfo
            repositoryId
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

export const GET_REPOSITORY = gql`
  ${REPOSITORY_INFO}
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...CoreRepositoryInfo
      url
    }
  }
`;

export const GET_REPOSITORY_AND_REVIEWS = gql`
  ${REPOSITORY_INFO}
  ${REVIEW_INFO}
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...CoreRepositoryInfo
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...CoreReviewInfo
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
