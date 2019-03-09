import React, { Component } from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ShowIssuesAndPullRequests } from "./components";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Request: React.FunctionComponent = () => (
  <ApolloProvider client={client}>
    <ShowIssuesAndPullRequests
      owner="harrystech"
      name="forge"
      author="maecapozzi"
    />
  </ApolloProvider>
);

class App extends Component {
  render() {
    return <Request />;
  }
}

export default App;
