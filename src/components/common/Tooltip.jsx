import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export const Tooltip = ({ title, pos, anchorId }) => {
  return (
    <ReactTooltip
      anchorId={anchorId}
      place={pos}
      content={title}
      style={{
        backgroundColor: "#5846cf",
        color: "#ffffff",
        border: "1px solid #5846cf",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        fontWeight: "500",
      }}
    />
  );
};
