import React from "react";
import moment from "moment";
import { getMergedAt } from "../transformers/filterPullRequestsByDate";

type Message = {
  message: string;
  mergedAt: string;
};

export const ShowCommits: React.FunctionComponent<Message> = ({
  message,
  mergedAt
}) => {
  return (
    <div>
      <p>Merged {moment(mergedAt, "YYYY-MM-DD").format("MMMM DD YYYY")}.</p>
      <p>{message.split("#)")[0]}</p>
    </div>
  );
};
