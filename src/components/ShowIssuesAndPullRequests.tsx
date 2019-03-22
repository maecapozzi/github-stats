import React from "react";
import { List } from ".";
import { Grid } from ".";
import {
  filterPullRequestsByDate,
  filterIssuesByDate
} from "../transformers/filterPullRequestsByDate";
import { Header } from "./Text";

const DAYS_IN_THE_WEEK = 7;

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

interface Permissions {
  pullRequests: PullRequest[];
  issues: Issue[];
}

export class ShowIssuesAndPullRequests extends React.Component<
  Permissions,
  {}
> {
  render() {
    const filteredPullRequests = filterPullRequestsByDate(
      this.props.pullRequests,
      7
    );

    const issues = filterIssuesByDate(this.props.issues, 7);

    if (this.props.pullRequests.length === 0) {
      return (
        <div>
          <Grid
            column1={
              <div>
                <Header>{"No PRs have been merged this week"}</Header>;
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
          />
        </div>
      );
    } else if (this.props.issues.length === 0) {
      return (
        <div>
          <Grid
            column1={
              <div>
                <Header>{`${
                  filteredPullRequests.length
                } pull requests merged in the last ${DAYS_IN_THE_WEEK} days 🚀`}</Header>
                <List items={filteredPullRequests} />
                <List items={filteredPullRequests} />
              </div>
            }
            column2={
              <div>
                <Header>{"No PRs have been merged this week"}</Header>;
              </div>
            }
          />
        </div>
      );
    } else {
    }

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
        />
      </div>
    );
  }
}
