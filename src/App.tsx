/** @jsx jsx */
import logo from "./logo.svg";
import styled from "@emotion/styled";
import { jsx, css, Global } from "@emotion/core";
import HourList from "./HourList";

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

function App() {
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
        `}
      />

      <ScheduleSpan>Schedule</ScheduleSpan>

      {/* <Card height={200}></Card> */}
      <HourList></HourList>
    </Root>
  );
}

export default App;
