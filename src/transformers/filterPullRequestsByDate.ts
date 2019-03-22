import moment from "moment";

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
    title: string;
    bodyHTML: string;
    url: string;
    closedAt: string;
  };
}

export const getMergedAt = (date: string) => {
  return moment(date, "YYYYMMDD");
};

export const filterPullRequestsByDate = (
  pullRequests: PullRequest[],
  numberOfDays: number
) => {
  const filteredPullRequests = pullRequests.filter(pullRequest => {
    return (
      moment().diff(getMergedAt(pullRequest.node.mergedAt), "days") <
        numberOfDays && pullRequest
    );
  });

  return filteredPullRequests;
};

export const filterIssuesByDate = (issues: Issue[], numberOfDays: number) => {
  const filteredIssues = issues.filter(issue => {
    return (
      moment().diff(getMergedAt(issue.node.closedAt), "days") < numberOfDays &&
      issue
    );
  });

  return filteredIssues;
};
