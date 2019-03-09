import React from "react";
import { Query } from "react-apollo";
import { Fetching, Error } from "../data-fetching";
import { GET_ISSUES_AND_PULL_REQUESTS } from "../queries";
import { List } from ".";

type Permissions = {
  owner: string;
  name: string;
  author: string;
};

export const ShowIssuesAndPullRequests: React.FunctionComponent<
  Permissions
> = ({ owner, name, author }) => (
  <Query
    query={GET_ISSUES_AND_PULL_REQUESTS}
    variables={{ owner: owner, name: "forge", author: "maecapozzi" }}
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
