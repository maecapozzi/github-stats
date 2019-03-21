import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Text } from "./Text";
import { Button } from "./Button";
import { useToggle } from "./hooks/useToggle";

const StyledDate = styled(Text)`
  font-size: 14px;
  padding: 0 0 20px 0;
`;

type Message = {
  mergedAt?: string;
  body?: string;
};

type ToggleProps = {
  children: React.ReactNode;
};

function createMarkup(html: string) {
  return { __html: html };
}

export const ShowCommits: React.FunctionComponent<Message> = ({
  mergedAt,
  body
}) => {
  const [state, toggle] = useToggle("off");

  return (
    <div>
      <StyledDate>
        This PR was merged {moment(mergedAt).fromNow()} on{" "}
        {moment(mergedAt, "YYYY-MM-DD").format("MMMM DD YYYY")}
      </StyledDate>
      <Button onClick={toggle} fontSize={16}>{`${
        state === "off" ? "Show" : "Hide"
      } details`}</Button>
      <Text
        style={{
          display: `${state === "off" ? "none" : "inline"}`,
          color: "#0D1B2A"
        }}
        dangerouslySetInnerHTML={createMarkup(
          body || "<div>Sorry, there was nothing there</div>"
        )}
      />
    </div>
  );
};
