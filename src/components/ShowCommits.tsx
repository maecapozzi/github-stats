import React from "react";

type Message = {
  message: string;
};

export const ShowCommits: React.FunctionComponent<Message> = ({ message }) => {
  return (
    <div>
      <p>{message.split("#")[0]}</p>
    </div>
  );
};
