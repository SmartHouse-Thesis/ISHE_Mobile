import React from "react";
import { Typography } from "antd";

type HeadingProps = {
  title: string;
  helper?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  titleSize?: number;
  textAlign?: "left" | "center" | "right" | "justify";
};

const Heading = ({
  title = "",
  helper = "",
  level,
  className,
  titleSize = 20,
  textAlign = "left",
}: HeadingProps) => {
  return (
    <div className={className}>
      <Typography.Title
        level={level}
        style={{ fontSize: titleSize, textAlign: textAlign }}
      >
        {title}
      </Typography.Title>
      <Typography>{helper}</Typography>
    </div>
  );
};

export default Heading;
