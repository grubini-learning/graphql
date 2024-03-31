import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import {
  Router,
  Route,
  hashHistory,
  IndexRoute,
  useRouterHistory,
} from "react-router";

import App from "./App";
import { Welcome, Form } from "./components";
import { login as loginMutation, signUp as signUpMutation } from "./mutations";
import { CurrentUserQuery } from "./queries";

const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: "same-origin",
  },
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route
            path="signup"
            component={() => (
              <Form
                {...{
                  submit: ({ email, password }) => {
                    return client.mutate({
                      mutation: signUpMutation,
                      variables: {
                        email,
                        password,
                      },
                      refetchQueries: [{ query: CurrentUserQuery }],
                    });
                  },
                  formTitle: "Sign Up",
                }}
              />
            )}
          />
          <Route
            path="signin"
            component={() => (
              <Form
                {...{
                  submit: ({ email, password }) => {
                    return client.mutate({
                      mutation: loginMutation,
                      variables: {
                        email,
                        password,
                      },
                      refetchQueries: [{ query: CurrentUserQuery }],
                    });
                  },
                  formTitle: "Sign In",
                }}
              />
            )}
          />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
