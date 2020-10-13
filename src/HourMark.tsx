import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { getHeight } from "./height-utils";

interface HourMarkContainerProps {
  minutes: number;
  height: number;
  isNow?: boolean;
}

const HourMarkContainer = styled.div`
  width: 360px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -46px;

  opacity: ${(props: HourMarkContainerProps) => {
    if (props.isNow) {
      return 1;
    }

    if (props.minutes == 0) {
      return 1;
    } else {
      return 0.1;
    }
  }};

  position: absolute;
  left: 0px;
  top: ${(props: HourMarkContainerProps) => props.height}px;

  scroll-margin: 160px;
`;

const HourMarkLabel = styled.span`
  margin-right: 10px;
  width: 60px;
`;

const HourMarkLabelNow = styled.span`
  margin-right: -70px;
  margin-left: 12px;
  width: 60px;
`;

const HourMarkLine = styled.div`
  width: 100%;
  height: 5px;
  background-image: linear-gradient(
    to right,
    white 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 4px 2px;
  background-repeat: repeat-x;
`;

const HourMarkLineNow = styled.div`
  width: 100%;
  height: 5px;
  background-image: linear-gradient(
    to right,
    red 100%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 4px 2px;
  background-repeat: repeat-x;
  margin-left: 55px;
`;

interface HourMarkProps {
  hours: number;
  minutes: number;
  isNow?: boolean;
}

export function useForceUpdate() {
  let [_, setUpdate] = useState(0);

  return () => setUpdate((u) => u + 1);
}

export default function HourMark(props: HourMarkProps) {
  let { hours, minutes, isNow } = props;
  let markRef = useRef<HTMLDivElement | null>(null);

  let forceUpdate = useForceUpdate();

  if (isNow) {
    hours = new Date().getHours();
    minutes = new Date().getMinutes();
  }

  useEffect(() => {
    if (!isNow) return;

    let interval = setInterval(() => forceUpdate(), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isNow]);

  useEffect(() => {
    if (isNow)
      markRef.current?.scrollIntoView({
        behavior: "smooth",
      });
  }, []);

  return (
    <HourMarkContainer
      ref={markRef}
      minutes={minutes}
      height={getHeight({
        hours,
        minutes,
      })}
      isNow={isNow}
    >
      {!isNow && (
        <HourMarkLabel>{`${hours
          .toString()
          .padStart(2, "0")}h${minutes
          .toString()
          .padStart(2, "0")}`}</HourMarkLabel>
      )}

      {isNow ? <HourMarkLineNow /> : <HourMarkLine />}

      {isNow && (
        <HourMarkLabelNow style={{ color: "red" }}>NOW</HourMarkLabelNow>
      )}
    </HourMarkContainer>
  );
}
