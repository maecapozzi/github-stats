import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ShowIssuesAndPullRequests } from "./components";
import { H1 } from "./components/Text";

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

const StyledH1 = styled(H1)`
  font-size: 70px;
  text-align: center;
  font-family: "Oswald";

  @media (min-width: 700px) {
    padding: 20px 0 0 20px;
  }
`;

const Request: React.FunctionComponent = () => (
  <ApolloProvider client={client}>
    <StyledH1>Forge Github Reports</StyledH1>
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
