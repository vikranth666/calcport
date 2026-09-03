import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";

export default function AverageCalculatorUI() {

  const [numbers, setNumbers] =
    useState("");

  const result = useMemo(() => {

    if (!numbers.trim()) {
      return null;
    }

    const values = numbers
      .split(",")
      .map((value) => Number(value.trim()))
      .filter(
        (value) => Number.isFinite(value)
      );

    if (!values.length) {
      return null;
    }

    const sum = values.reduce(
      (total, value) => total + value,
      0
    );

    const average = sum / values.length;

    return {
      sum,
      count: values.length,
      average,
    };

  }, [numbers]);

  const resetCalculator = () => {
    setNumbers("");
  };

  const formatNumber = (value) =>
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 4,
    });

  return (
    <CalculatorContainer>

      <div className="input-group">

        <label>
          Enter Numbers
        </label>

        <textarea
          value={numbers}
          onChange={(event) =>
            setNumbers(event.target.value)
          }
          placeholder="e.g. 10, 20, 30, 40"
          rows="4"
          className="average-input"
        />

        <small>
          Separate numbers using commas.
        </small>

      </div>

      <ResultGrid>

        <ResultBox
          label="Average"
          value={
            result
              ? formatNumber(result.average)
              : "—"
          }
        />

        <ResultBox
          label="Sum"
          value={
            result
              ? formatNumber(result.sum)
              : "—"
          }
        />

        <ResultBox
          label="Count"
          value={
            result
              ? result.count
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