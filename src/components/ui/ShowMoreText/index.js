"use client";

import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";
import ReactShowMoreText from "react-show-more-text";

const ShowMoreText = ({
  text,
  lines = 2,
  moreText = "Show More",
  lessText = "Show Less",
  classNames = "break-all",
  ...props
}) => {
  const divRef = useRef(null);
  const [width, setWidth] = useState();

  useEffect(() => {
    divRef.current && setWidth(Number(divRef.current.offsetWidth));
  }, []);

  return (
    <div ref={divRef} className={cn("w-full", classNames)}>
      <ReactShowMoreText
        lines={lines}
        width={width || 500}
        more={<span className="cursor-pointer text-[#21A5B6]">{moreText}</span>}
        less={<span className="cursor-pointer text-[#21A5B6]">{lessText}</span>}
        expanded={false}
        keepNewLines
        {...props}
      >
        {`${text?.trim?.()}`}
      </ReactShowMoreText>
    </div>
  );
};

export default ShowMoreText;
