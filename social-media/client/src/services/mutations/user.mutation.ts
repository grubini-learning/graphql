import { useMutation } from "react-query";
import { gql } from "graphql-request";
import { useNavigate } from "react-router-dom";

import { Payload, User } from "../../types";
import { GraphClient } from "..";

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user: Pick<User, "email" | "password">) => {
      return await GraphClient.getInstance().request(
        gql`
          mutation SignIn($email: String!, $password: String!) {
            signIn(email: $email, password: $password) {
              userErrors {
                message
              }
              id
              token
            }
          }
        `,
        { ...user }
      );
    },
    onSuccess(data, _variables, _context) {
      const {
        signIn: {
          userErrors,
          user: { token, id },
        },
      } = data as {
        signIn: Payload<"user", { token: string; id: string }>;
      };

      console.log(userErrors);

      if (userErrors?.length > 0) {
        console.log("The sign in errors are: ", userErrors);
      } else {
        localStorage.setItem("token", token);
        navigate(`/profile/${id}`);
      }
    },
    onError(error, variables, context) {
      const {
        signIn: { userErrors },
      } = error as {
        signIn: Payload<"token", string>;
      };

      if (userErrors?.length > 0) {
        console.log("The sign in errors are: ", userErrors);
      }
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (
      user: Pick<User, "email" | "name" | "password" | "profile">
    ) => {
      console.log("ther userr is: ", user);

      return await GraphClient.getInstance().request(
        gql`
          mutation SignUp($user: UserInput!) {
            signUp(user: $user) {
              userErrors {
                message
              }
              token
            }
          }
        `,
        { user }
      );
    },
    onSuccess: (data) => {
      console.log("the data: ", data);

      const {
        signUp: { userErrors, token },
      } = data as {
        signUp: Payload<"token", string>;
      };

      if (userErrors?.length > 0) {
        console.log("The sign in errors are: ", userErrors);
      } else {
        localStorage.setItem("token", token);
        navigate("/");
      }
    },
    onError: (error) => {
      console.log("there was an error: ", error);
    },
  });
};
