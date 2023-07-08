import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/mutations";

interface SignInProps {
  username: string;
  password: string;
}
// eslint-disable-next-line no-unused-vars
type signInFunc = (arg: SignInProps) => Promise<FetchResult<any>>;

const useSignIn = (): [signInFunc, MutationResult<any>] => {
  const [mutate, result] = useMutation(SIGNIN);

  const signIn = async ({ username, password }: SignInProps) => {
    return mutate({ variables: { credentials: { username, password } } });
  };
  return [signIn, result];
};

export default useSignIn;
