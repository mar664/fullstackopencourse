import { useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/mutations";

interface SignInProps {
  username: string;
  password: string;
}
const useSignIn = () => {
  const [mutate, result] = useMutation(SIGNIN);

  const signIn = async ({ username, password }: SignInProps) =>
    await mutate({ variables: { credentials: { username, password } } });
  return [signIn, result];
};

export default useSignIn;
