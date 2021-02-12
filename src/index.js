import React, { useState } from "react";

const formatSecsToFriendly = (s) =>
  `${Math.floor(s / 60)
    .toFixed(0)
    .toString()}:${Math.floor(s % 60)
    .toFixed(0)
    .toString()
    .padStart(2, "0")}`;

const Timeline = ({
  currentTime = 0,
  totalDuration = 0,
  onSetNewTime,
  height = 50,
  width = 300,
  padding = 10,
  color = "black",
}) => {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [mouseTime, setMouseTime] = useState(0);
  const [mousePercent, setMousePercent] = useState(0);
  return (
    <div
      id="timelineContainer"
      style={{
        position: "relative",
        paddingLeft: `${padding}px`,
        paddingRight: `${padding}px`,
        width,
        height,
        cursor: "pointer",
      }}
      onMouseEnter={(_) => setMouseEntered(true)}
      onMouseLeave={(_) => setMouseEntered(false)}
      onMouseMoveCapture={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mousePercent = Math.max(
          0,
          Math.min(
            1,
            (e.clientX - rect.left - padding) / (rect.width - 2 * padding)
          )
        );
        const mouseTime = Math.max(
          0,
          Math.min(totalDuration, totalDuration * mousePercent)
        );
        setMouseTime(mouseTime);
        setMousePercent(mousePercent);
      }}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const currentTimePercent =
          (e.clientX - rect.left - padding) / (rect.width - 2 * padding);
        onSetNewTime(totalDuration * currentTimePercent);
      }}
    >
      <div
        id="timelineTimes"
        style={{
          color,
          position: "absolute",
          top: height <= 60 ? "5%" : "15%",
          fontSize: "smaller",
          userSelect: "none",
        }}
      >
        {`${formatSecsToFriendly(currentTime)} / ${formatSecsToFriendly(
          totalDuration
        )}`}
      </div>
      <div
        id="timelineBar"
        style={{
          position: "absolute",
          bottom: "20%",
          width: "inherit",
          height: 6,
          background: "#6f6f6f",
        }}
      >
        {!!mouseEntered && (
          <div
            id="timelineDot"
            style={{
              position: "absolute",
              top: -3,
              left: `calc(${(100 * currentTime) / totalDuration}% - 6px)`,
              width: 12,
              height: 12,
              background: color,
              borderRadius: "50%",
              color,
            }}
          />
        )}
        {totalDuration !== undefined && totalDuration !== null && (
          <>
            <div
              id="timelineIndicator"
              style={{
                position: "absolute",
                bottom: 0,
                width: `calc(${(100 * currentTime) / totalDuration}%)`,
                height: 6,
                background: color,
                color,
                borderRadius: 4,
              }}
            />
            {!!mouseEntered && (
              <div
                id="timelineTooltip"
                style={{
                  position: "absolute",
                  top: -16,
                  left:
                    height >= 50
                      ? `calc(${100 * mousePercent}% * 0.94)`
                      : "50%",
                  color,
                  fontSize: "small",
                  userSelect: "none",
                }}
              >
                {formatSecsToFriendly(mouseTime)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Timeline;
