import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Query } from "react-apollo";
import { Fetching, Error } from "../data-fetching";
import { GET_ISSUES_AND_PULL_REQUESTS } from "../queries";
import { List } from ".";
import { Grid } from ".";
import { filterPullRequestsByDate } from "../transformers/filterPullRequestsByDate";
import { Header, H1 } from "./Text";

const DAYS_IN_THE_WEEK = 7;

type AppState = {
  owner: string;
  name: string;
};

type Permissions = {
  owner: string;
  name: string;
};

export class ShowIssuesAndPullRequests extends React.Component<
  AppState,
  Permissions
> {
  state = {
    owner: "",
    name: ""
  };

  render() {
    return (
      <Query
        query={GET_ISSUES_AND_PULL_REQUESTS}
        variables={{
          owner: this.props.owner,
          name: this.props.name
        }}
        errorPolicy="ignore"
      >
        {({ loading, error, data, refetch }) => {
          if (error) {
            return <Error />;
          }

          if (loading) {
            return <Fetching />;
          }

          if (data && data.repository) {
            const filteredPullRequests = filterPullRequestsByDate(
              data.repository.pullRequests.edges,
              DAYS_IN_THE_WEEK
            );

            const issues = data.repository.issues.edges;
            return (
              <div>
                <Grid
                  column1={
                    <div>
                      <Header>{`${
                        filteredPullRequests.length
                      } pull requests merged in the last ${DAYS_IN_THE_WEEK} days 🚀`}</Header>
                      <List items={filteredPullRequests} />
                    </div>
                  }
                  column2={
                    <div>
                      <Header>{`${
                        issues.length
                      } closed issues in the last ${DAYS_IN_THE_WEEK} days`}</Header>
                      <List items={issues} />
                    </div>
                  }
                  column3={<div>Reviewer Leaderboard</div>}
                />
              </div>
            );
          } else {
            return <Error />;
          }
        }}
      </Query>
    );
  }
}
