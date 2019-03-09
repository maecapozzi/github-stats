import moment from "moment";

type PullRequest = {
  node: {
    title: string;
    url: string;
    mergedAt: string;
  };
};

export const getMergedAt = (date: string) => {
  return moment(date, "YYYYMMDD");
};

export const filterPullRequestsByDate = (
  pullRequests: Array<PullRequest>,
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
