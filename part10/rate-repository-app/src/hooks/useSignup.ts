import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";

interface SignUpProps {
  username: string;
  password: string;
}
// eslint-disable-next-line no-unused-vars
type signInFunc = (arg: SignUpProps) => Promise<FetchResult<any>>;

const useSignUp = (): [signInFunc, MutationResult<any>] => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }: SignUpProps) => {
    return mutate({ variables: { user: { username, password } } });
  };
  return [signUp, result];
};

export default useSignUp;
