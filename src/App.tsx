import React, { Component } from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
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

const GET_PULL_REQUESTS = gql`
  query {
    repository(owner: "harrystech", name: "forge") {
      pullRequests(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_ISSUES = gql`
  query {
    repository(owner: "harrystech", name: "forge") {
      issues(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Error = () => <h1>There was an error</h1>;

const Fetching = () => <h1>Loading...</h1>;

const Request = () => (
  <ApolloProvider client={client}>
    <Query query={GET_PULL_REQUESTS}>
      {({ loading, error, data }) => {
        if (error) return <Error />;
        if (loading || !data) return <Fetching />;

        return (
          <div>{`You have closed ${
            data.repository.pullRequests.edges.length
          } pull requests`}</div>
        );
      }}
    </Query>
  </ApolloProvider>
);

class App extends Component {
  render() {
    return <Request />;
  }
}

export default App;
