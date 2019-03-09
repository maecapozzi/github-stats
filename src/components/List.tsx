import React from "react";
import { ShowCommits } from ".";

type ListProps = {
  items: {
    node: {
      title: string;
      url: string;
      mergedAt: string;
    };
  }[];
};

type Item = {
  node: {
    title: string;
    url: string;
    mergedAt: string;
    mergeCommit?: {
      message: string;
    };
  };
};

export const List: React.FunctionComponent<ListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item: Item) => {
        const { url, title } = item.node;

        return (
          <li key={url}>
            <div>
              <a href={url}>{title}</a>
              {item.node.mergeCommit ? (
                <ShowCommits
                  message={item.node.mergeCommit.message}
                  mergedAt={item.node.mergedAt}
                />
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
