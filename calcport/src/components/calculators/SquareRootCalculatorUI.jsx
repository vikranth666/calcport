import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import InputField
  from "../InputField";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function SquareRootCalculatorUI() {

  const [number, setNumber] = useState("");


  const result = useMemo(() => {

    if (number === "") {
      return null;
    }

    const value = Number(number);

    if (!Number.isFinite(value)) {
      return null;
    }

    if (value < 0) {
      return {
        error:
          "Square root of a negative number is not a real number.",
      };
    }

    return {
      squareRoot: Math.sqrt(value),
    };

  }, [number]);


  const resetCalculator = () => {
    setNumber("");
  };


  const formattedResult =
    result && !result.error
      ? result.squareRoot.toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 10,
          }
        )
      : "—";


  return (
    <CalculatorContainer>

      <InputField
        label="Number"
        value={number}
        placeholder="e.g. 25"
        step="any"
        onChange={(event) =>
          setNumber(event.target.value)
        }
      />

      <ResultGrid>

        <ResultBox
          label="Square Root"
          value={
            result?.error
              ? result.error
              : formattedResult
          }
          copyValue={
            result && !result.error
              ? String(result.squareRoot)
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