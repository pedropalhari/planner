/** @jsx jsx */
import logo from "./logo.svg";
import styled from "@emotion/styled";
import { jsx, css, Global } from "@emotion/core";
import HourList from "./HourList";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import { useState, useMemo, useRef, useCallback } from "react";
import { formatSchedule } from "./schedule";
import { motion, useAnimation } from "framer-motion";

const Root = styled.div`
  width: 100vw;

  background-color: #1f1b24;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScheduleSpan = styled.span`
  font-size: 4rem;
  font-weight: bold;
`;

const EditSpan = styled.span`
  font-size: 1rem;
  font-weight: normal;
  opacity: 0.6;
`;

const SaveButton = styled.button`
  width: 360px;
  height: 40px;
  background-color: #433e47dd;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 5px;

  margin-top: 10px;
  margin-bottom: 10px;
`;

type ScheduleJSON = { name: string; from: string; to: string }[];

function App() {
  let [scheduleJSON, setScheduleJSON] = useState<ScheduleJSON>(() => {
    let scheduleJSONString = localStorage.getItem("@planner/schedule");
    if (scheduleJSONString) {
      return JSON.parse(scheduleJSONString);
    } else {
      return [
        { name: "Example 1 ⛵", from: "7h00", to: "10h00" },
        { name: "Example 2 📗", from: "13h00", to: "17h00" },
      ];
    }
  });

  let [localJSON, setLocalJSON] = useState(scheduleJSON);

  let formattedScheduleJSON = useMemo(() => formatSchedule(scheduleJSON), [
    scheduleJSON,
  ]);

  let animationControl = useAnimation();
  let [isEditOpen, setIsEditOpen] = useState(false);

  const toggleEdit = useCallback(() => {
    if (isEditOpen) {
      animationControl.start({ height: 0 });
    } else {
      animationControl.start({ height: 430 });
    }

    isEditOpen = !isEditOpen;
  }, [isEditOpen]);

  return (
    <Root>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

          body {
            overflow-x: hidden;
          }

          * {
            color: white;
            font-family: "Poppins", sans-serif;
            box-sizing: border-box;
          }

          .jsoneditor-statusbar {
            background-color: #534b5edd;
          }

          .jsoneditor {
            border: none;
          }

          .jsoneditor-menu {
            background-color: #534b5edd;
            border-color: #534b5edd;
          }

          textarea.jsoneditor-text {
            background-color: #433e47dd;
            color: white !important;
          }
        `}
      />

      <ScheduleSpan>Schedule</ScheduleSpan>

      <EditSpan
        onClick={() => {
          setIsEditOpen((e) => !e);
          toggleEdit();
        }}
      >
        {isEditOpen ? "close" : "open"} edit
      </EditSpan>

      <motion.div
        initial={{ height: 0 }}
        animate={animationControl}
        style={{ overflow: "hidden" }}
      >
        <Editor
          mode="code"
          schema={{
            properties: {
              type: "array",
            },
          }}
          htmlElementProps={{
            style: {
              width: 360,
              height: 360,
            },
          }}
          value={localJSON}
          onChange={(e: any) => {
            setLocalJSON(e);
          }}
        />

        <SaveButton
          onClick={() => {
            setScheduleJSON(localJSON);
            localStorage.setItem(
              "@planner/schedule",
              JSON.stringify(localJSON)
            );
          }}
        >
          save
        </SaveButton>
      </motion.div>

      {/* <Card height={200}></Card> */}
      <HourList schedule={formattedScheduleJSON}></HourList>
    </Root>
  );
}

export default App;
