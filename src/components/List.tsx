import React from "react";
import { ShowCommits } from ".";

type ListProps = {
  items: {
    node: {
      title: string;
      url: string;
    };
  }[];
};

type Item = {
  node: {
    title: string;
    url: string;
    mergeCommit?: {
      message: string;
    };
  };
};

export const List: React.FunctionComponent<ListProps> = ({ items }) => (
  <ul>
    {items.map((item: Item) => {
      const { url, title } = item.node;

      return (
        <li key={url}>
          <div>
            <a href={url}>{title}</a>
            {item.node.mergeCommit ? (
              <ShowCommits message={item.node.mergeCommit.message} />
            ) : null}
          </div>
        </li>
      );
    })}
  </ul>
);
