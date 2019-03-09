import gql from "graphql-tag";

export const GET_ISSUES_AND_PULL_REQUESTS = gql`
  query Repository($owner: String!, $name: String!, $author: String!) {
    repository(owner: $owner, name: $name) {
      pullRequests(last: 100, states: MERGED) {
        edges {
          node {
            title
            url
            mergedAt
            mergeCommit {
              id
              message
            }
            reviews(first: 10, author: $author) {
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
      issues(last: 5, states: CLOSED) {
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
