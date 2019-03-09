import { filterPullRequestsByDate } from "./filterPullRequestsByDate";

const constructMockPullRequest = date => {
  return {
    node: {
      title: "refactor(Transition): Change startAnimation prop to start",
      url: "https://github.com/harrystech/forge/pull/143",
      mergedAt: date
    }
  };
};

describe("filterPullRequestsByDate", () => {
  it("returns an empty array if the date is more than 7 days ago", () => {
    const mockPullRequests = [constructMockPullRequest("2018-03-07T14:15:54Z")];
    expect(filterPullRequestsByDate(mockPullRequests, 7).length).toBe(0);
  });

  it("returns an array that only contains pull requests merged before 7 days, when the second argument is 7", () => {
    const date = new Date();
    const mockPullRequests = [constructMockPullRequest(date.toISOString())];
    expect(filterPullRequestsByDate(mockPullRequests, 7).length).toBe(1);
  });

  it("returns an array that does not contain pull requests merged more than 2 agos", () => {
    const date = new Date();
    const threeDaysAgo = new Date(date.setDate(date.getDate() - 3));
    const mockPullRequests = [
      constructMockPullRequest(threeDaysAgo.toISOString())
    ];
    expect(filterPullRequestsByDate(mockPullRequests, 2).length).toBe(0);
  });
});
