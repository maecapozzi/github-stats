import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Fetching, Error } from "../data-fetching";
import { GET_ISSUES_AND_PULL_REQUESTS } from "../queries";
import { List } from ".";
import { Grid } from ".";
import { filterPullRequestsByDate } from "../transformers/filterPullRequestsByDate";
import { Header, H1 } from "./Text";

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
    variables={{ owner: owner, name: name, author: author }}
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
        <div>
          <Grid
            column1={
              <div>
                <Header>{`${
                  filteredPullRequests.length
                } pull requests in the last ${DAYS_IN_THE_WEEK} days 🚀`}</Header>
                <List items={filteredPullRequests} />
              </div>
            }
            column2={
              <div>
                <Header>{`${
                  data.repository.issues.edges.length
                } closed issues in the last ${DAYS_IN_THE_WEEK} days`}</Header>
                <List items={issues} />
              </div>
            }
            column3={<div>Reviewer Leaderboard</div>}
          />
        </div>
      );
    }}
  </Query>
);
