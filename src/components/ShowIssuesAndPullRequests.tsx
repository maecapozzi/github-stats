import React from "react";
import { Query } from "react-apollo";
import { Fetching, Error } from "../data-fetching";
import { GET_ISSUES_AND_PULL_REQUESTS } from "../queries";
import { List } from ".";
import { Grid } from ".";
import { filterPullRequestsByDate } from "../transformers/filterPullRequestsByDate";

const DAYS_IN_THE_WEEK = 7;

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

      const filteredPullRequests = filterPullRequestsByDate(
        data.repository.pullRequests.edges.reverse(),
        DAYS_IN_THE_WEEK
      );

      const issues = data.repository.issues.edges.reverse();

      return (
        <Grid
          column1={
            <div>
              <p>{`${
                filteredPullRequests.length
              } recently merged pull requests`}</p>
              <List items={filteredPullRequests} />
            </div>
          }
          column2={
            <div>
              <p>{`${
                data.repository.issues.edges.length
              } recently closed issues`}</p>
              <List items={issues} />
            </div>
          }
          column3={<div>Reviewer Leaderboard</div>}
        />
      );
    }}
  </Query>
);
