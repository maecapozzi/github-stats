import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Query } from "react-apollo";
import { Fetching, Error } from "../data-fetching";
import { GET_ISSUES_AND_PULL_REQUESTS } from "../queries";
import { List } from ".";
import { Grid } from ".";
import {
  filterPullRequestsByDate,
  filterIssuesByDate
} from "../transformers/filterPullRequestsByDate";
import { Header, H1 } from "./Text";

const DAYS_IN_THE_WEEK = 7;

type AppState = {};

interface PullRequest {
  node: {
    title: string;
    bodyHTML: string;
    url: string;
    mergedAt: string;
    mergeCommit: {
      id: string;
    };
  };
}

interface Issue {
  node: {
    bodyHTML: string;
    closedAt: string;
    title: string;
    url: string;
  };
}

type Permissions = {
  pullRequests: Array<PullRequest>;
  issues: Array<Issue>;
};

export class ShowIssuesAndPullRequests extends React.Component<
  Permissions,
  AppState
> {
  render() {
    const filteredPullRequests = filterPullRequestsByDate(
      this.props.pullRequests,
      7
    );

    const issues = filterIssuesByDate(this.props.issues, 7);

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
  }
}
