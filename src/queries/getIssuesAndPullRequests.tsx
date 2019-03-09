import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Fetching, Error } from "../data-fetching";

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

type ListProps = {
  items: {
    node: {
      title: string;
      url: string;
    };
  }[];
};

type Item = {
  node: {
    title: string;
    url: string;
    mergeCommit?: {
      message: string;
    };
  };
};

type Message = {
  message: string;
};

const ShowCommits: React.FunctionComponent<Message> = ({ message }) => {
  const initial = message.split("#")[0];

  return (
    <div>
      <p>{initial}</p>
    </div>
  );
};

const List: React.FunctionComponent<ListProps> = ({ items }) => (
  <ul>
    {items.map((item: Item) => {
      const { url, title } = item.node;

      return (
        <li key={url}>
          <div>
            <a href={url}>{title}</a>
            {item.node.mergeCommit ? (
              <ShowCommits message={item.node.mergeCommit.message} />
            ) : null}
          </div>
        </li>
      );
    })}
  </ul>
);

export const ShowIssues: React.FunctionComponent = () => (
  <Query
    query={GET_ISSUES_AND_PULL_REQUESTS}
    variables={{ owner: "harrystech", name: "forge", author: "maecapozzi" }}
  >
    {({ loading, error, data }) => {
      if (error) return <Error />;
      if (loading || !data) return <Fetching />;

      const pullRequests = data.repository.pullRequests.edges.reverse();
      const issues = data.repository.issues.edges.reverse();

      return (
        <div>
          <div>
            <p>{`${pullRequests.length} recently merged pull requests`}</p>
            <List items={pullRequests} />
          </div>
          <p>{`${
            data.repository.issues.edges.length
          } recently closed issues`}</p>
          <List items={issues} />
        </div>
      );
    }}
  </Query>
);
