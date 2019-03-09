import React from "react";
import { ShowCommits } from ".";
import { Link, StyledList } from "./Text";
import { Card } from "./Card";

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
    bodyHTML?: string;
  };
};

export const List: React.FunctionComponent<ListProps> = ({ items }) => {
  return (
    <>
      {items.map((item: Item) => {
        const { url, title } = item.node;
        return (
          <div key={url}>
            <Card>
              <Link href={url}>{title}</Link>

              {item.node.mergedAt ? (
                <ShowCommits
                  mergedAt={item.node.mergedAt}
                  body={item.node.bodyHTML}
                />
              ) : null}
            </Card>
          </div>
        );
      })}
    </>
  );
};
