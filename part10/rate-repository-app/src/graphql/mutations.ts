import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
