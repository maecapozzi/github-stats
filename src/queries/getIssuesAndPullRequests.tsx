import gql from "graphql-tag";

export const GET_ISSUES_AND_PULL_REQUESTS = gql`
  query Repository($owner: String!, $name: String!, $author: String!) {
    repository(owner: $owner, name: $name) {
      pullRequests(last: 10, states: MERGED) {
        edges {
          node {
            title
            url
            mergeCommit {
              id
              message
            }
            reviews(first: 0, author: $author) {
              edges {
                node {
                  id
                }
              }
            }
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

      issues(last: 10, states: CLOSED) {
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
