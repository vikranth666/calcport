import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";


export default function TimeDurationUI() {

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  const result = useMemo(() => {

    if (!startTime || !endTime) {
      return null;
    }


    const [startHours, startMinutes] =
      startTime.split(":").map(Number);

    const [endHours, endMinutes] =
      endTime.split(":").map(Number);


    if (
      !Number.isFinite(startHours) ||
      !Number.isFinite(startMinutes) ||
      !Number.isFinite(endHours) ||
      !Number.isFinite(endMinutes)
    ) {
      return null;
    }


    let startTotalMinutes =
      startHours * 60 + startMinutes;

    let endTotalMinutes =
      endHours * 60 + endMinutes;


    // If end time is earlier than start time,
    // treat it as the following day.
    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }


    const totalMinutes =
      endTotalMinutes - startTotalMinutes;

    const hours =
      Math.floor(totalMinutes / 60);

    const minutes =
      totalMinutes % 60;

    const totalSeconds =
      totalMinutes * 60;


    return {
      hours,
      minutes,
      totalMinutes,
      totalSeconds,
    };

  }, [startTime, endTime]);


  const resetCalculator = () => {
    setStartTime("");
    setEndTime("");
  };


  return (
    <CalculatorContainer>

      <div className="input-group">

        <label htmlFor="start-time">
          Start Time
        </label>

        <input
          id="start-time"
          type="time"
          value={startTime}
          onChange={(event) =>
            setStartTime(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label htmlFor="end-time">
          End Time
        </label>

        <input
          id="end-time"
          type="time"
          value={endTime}
          onChange={(event) =>
            setEndTime(event.target.value)
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Duration"
          value={
            result
              ? `${result.hours} hr ${result.minutes} min`
              : "—"
          }
          copyValue={
            result
              ? `${result.hours} hours ${result.minutes} minutes`
              : ""
          }
        />

        <ResultBox
          label="Total Minutes"
          value={
            result
              ? result.totalMinutes.toLocaleString("en-IN")
              : "—"
          }
          copyValue={
            result
              ? String(result.totalMinutes)
              : ""
          }
        />

        <ResultBox
          label="Total Seconds"
          value={
            result
              ? result.totalSeconds.toLocaleString("en-IN")
              : "—"
          }
          copyValue={
            result
              ? String(result.totalSeconds)
              : ""
          }
        />

      </ResultGrid>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>
  );
}