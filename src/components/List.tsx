import React from "react";
import { ShowCommits } from ".";
import { Link } from "./Text";
import { Card } from "./Card";

interface ListProps {
  items: {
    node: {
      title: string;
      url: string;
      mergedAt?: string;
    };
  }[];
}

interface Item {
  node: {
    title: string;
    url: string;
    closedAt?: string;
    mergedAt?: string;
    bodyHTML?: string;
  };
}

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
              ) : (
                <ShowCommits
                  mergedAt={item.node.closedAt}
                  body={item.node.bodyHTML}
                />
              )}
            </Card>
          </div>
        );
      })}
    </>
  );
};
