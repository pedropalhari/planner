import React from "react";
import styled from "@emotion/styled";
import HourMark from "./HourMark";
import { TOTAL_HEIGHT, getHeight } from "./height-utils";
import { SCHEDULE } from "./schedule";

const HourListContainer = styled.div`
  height: ${TOTAL_HEIGHT}px;
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

interface CardProps {
  initialHeight: number;
  finalHeight: number;
  index: number;
}

const Card = styled.div`
  width: 280px;
  background-color: ${(props: CardProps) =>
    props.index % 2 ? "#433e47dd" : "#534B5Edd"};

  padding: 10px;

  position: absolute;

  left: 0px;

  top: ${(props: CardProps) => props.initialHeight - 1}px;
  height: ${(props: CardProps) => props.finalHeight + 2}px;

  border-radius: 5px;

  /* fiddling with center */
  margin-left: 20px;
  margin-top: 14px;

  font-weight: bold;
`;

export default function HourList() {
  return (
    <HourListContainer>
      {new Array(48).fill(0).map((_, index) => {
        let roundedHour = Math.floor(index / 2);

        if (index % 2 == 0) return <HourMark hours={roundedHour} minutes={0} />;
        else return <HourMark hours={roundedHour} minutes={30} />;
      })}

      <HourMark hours={0} minutes={0} isNow />

      {SCHEDULE.map((s, index) => (
        <Card
          key={`${s.name}_${s.startingTime}_${s.duration}`}
          initialHeight={getHeight(s.startingTime)}
          finalHeight={getHeight(s.duration)}
          index={index}
        >
          {s.name}
        </Card>
      ))}
    </HourListContainer>
  );
}
