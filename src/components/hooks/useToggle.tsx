import React, { useState } from "react";

export const useToggle = (initialState: string) => {
  const [state, setState] = useState(initialState);

  const toggle = () =>
    setState(prevState => {
      if (prevState === "off") {
        return "on";
      } else {
        return "off";
      }
    });

  return [state, toggle] as [string, () => void];
};
