import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

/* import InputField
  from "../InputField"; */

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function StatisticsCalculatorUI() {

  const [numbers, setNumbers] = useState("");


  const result = useMemo(() => {

    if (numbers.trim() === "") {
      return null;
    }


    const values = numbers
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value !== "")
      .map(Number);


    if (
      values.length === 0 ||
      values.some(
        (value) => !Number.isFinite(value)
      )
    ) {
      return {
        error:
          "Please enter valid numbers separated by commas.",
      };
    }


    const sorted = [...values].sort(
      (a, b) => a - b
    );


    const count = values.length;


    const sum = values.reduce(
      (total, value) => total + value,
      0
    );


    const mean = sum / count;


    let median;

    if (count % 2 === 0) {
      const middle1 =
        sorted[count / 2 - 1];

      const middle2 =
        sorted[count / 2];

      median = (middle1 + middle2) / 2;
    } else {
      median = sorted[Math.floor(count / 2)];
    }


    const frequencyMap = {};

    values.forEach((value) => {
      frequencyMap[value] =
        (frequencyMap[value] || 0) + 1;
    });


    const frequencies =
      Object.values(frequencyMap);

    const highestFrequency =
      Math.max(...frequencies);


    const modes =
      highestFrequency > 1
        ? Object.keys(frequencyMap)
            .filter(
              (value) =>
                frequencyMap[value] ===
                highestFrequency
            )
            .map(Number)
        : [];


    const minimum = sorted[0];

    const maximum =
      sorted[sorted.length - 1];

    const range = maximum - minimum;


    return {
      count,
      sum,
      mean,
      median,
      modes,
      minimum,
      maximum,
      range,
    };

  }, [numbers]);


  const resetCalculator = () => {
    setNumbers("");
  };


  const formatNumber = (value) =>
    value.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 10,
      }
    );


  const modeText =
    result && !result.error
      ? result.modes.length > 0
        ? result.modes
            .map(formatNumber)
            .join(", ")
        : "No mode"
      : "—";


  return (
    <CalculatorContainer>

   <div className="input-group">
  <label htmlFor="statistics-numbers">
    Numbers
  </label>

  <input
    id="statistics-numbers"
    type="text"
    value={numbers}
    placeholder="e.g. 10, 20, 20, 30, 40"
    onChange={(event) =>
      setNumbers(event.target.value)
    }
  />
</div>

      <ResultGrid>

        <ResultBox
          label="Count"
          value={
            result?.error
              ? result.error
              : result
              ? formatNumber(result.count)
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.count)
              : ""
          }
        />

        <ResultBox
          label="Sum"
          value={
            result && !result.error
              ? formatNumber(result.sum)
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.sum)
              : ""
          }
        />

        <ResultBox
          label="Mean"
          value={
            result && !result.error
              ? formatNumber(result.mean)
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.mean)
              : ""
          }
        />

        <ResultBox
          label="Median"
          value={
            result && !result.error
              ? formatNumber(result.median)
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.median)
              : ""
          }
        />

        <ResultBox
          label="Mode"
          value={modeText}
          copyValue={
            result &&
            !result.error &&
            result.modes.length > 0
              ? result.modes.join(", ")
              : ""
          }
        />

        <ResultBox
          label="Minimum"
          value={
            result && !result.error
              ? formatNumber(result.minimum)
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.minimum)
              : ""
          }
        />

        <ResultBox
          label="Maximum"
          value={
            result && !result.error
              ? formatNumber(result.maximum)
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.maximum)
              : ""
          }
        />

        <ResultBox
          label="Range"
          value={
            result && !result.error
              ? formatNumber(result.range)
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.range)
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