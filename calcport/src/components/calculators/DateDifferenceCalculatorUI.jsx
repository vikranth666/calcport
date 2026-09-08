import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";

export default function DateDifferenceCalculatorUI() {

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const result = useMemo(() => {

    if (!startDate || !endDate) {
      return null;
    }

    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return null;
    }

    const difference =
      Math.abs(end - start);

    const totalDays =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

    const weeks =
      Math.floor(totalDays / 7);

    const remainingDays =
      totalDays % 7;

    const months =
      Math.floor(totalDays / 30);

    return {
      totalDays,
      weeks,
      remainingDays,
      months,
    };

  }, [startDate, endDate]);

  const resetCalculator = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <CalculatorContainer>

      <div className="input-group">

        <label>
          Start Date
        </label>

        <input
          type="date"
          value={startDate}
          onChange={(event) =>
            setStartDate(event.target.value)
          }
        />

      </div>

      <div className="input-group">

        <label>
          End Date
        </label>

        <input
          type="date"
          value={endDate}
          onChange={(event) =>
            setEndDate(event.target.value)
          }
        />

      </div>

      <ResultGrid>

        <ResultBox
          label="Total Days"
          value={
            result
              ? result.totalDays
              : "—"
          }
        />

        <ResultBox
          label="Total Weeks"
          value={
            result
              ? `${result.weeks} weeks ${result.remainingDays} days`
              : "—"
          }
        />

        <ResultBox
          label="Approximate Months"
          value={
            result
              ? result.months
              : "—"
          }
        />

      </ResultGrid>

      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>
  );
}