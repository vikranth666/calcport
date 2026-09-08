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


export default function PowerCalculatorUI() {

  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");


  const result = useMemo(() => {

    if (
      base === "" ||
      exponent === ""
    ) {
      return null;
    }

    const baseValue = Number(base);
    const exponentValue = Number(exponent);

    if (
      !Number.isFinite(baseValue) ||
      !Number.isFinite(exponentValue)
    ) {
      return null;
    }

    if (
      baseValue === 0 &&
      exponentValue < 0
    ) {
      return {
        error:
          "Zero cannot be raised to a negative exponent.",
      };
    }

    const value = Math.pow(
      baseValue,
      exponentValue
    );

    if (!Number.isFinite(value)) {
      return {
        error:
          "The result is too large to calculate.",
      };
    }

    if (Number.isNaN(value)) {
      return {
        error:
          "This combination does not produce a real number.",
      };
    }

    return {
      value,
    };

  }, [base, exponent]);


  const resetCalculator = () => {
    setBase("");
    setExponent("");
  };


  const formattedResult =
    result && !result.error
      ? result.value.toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 10,
          }
        )
      : "—";


  return (
    <CalculatorContainer>

      <InputField
        label="Base Number"
        value={base}
        placeholder="e.g. 2"
        step="any"
        onChange={(event) =>
          setBase(event.target.value)
        }
      />


      <InputField
        label="Exponent"
        value={exponent}
        placeholder="e.g. 3"
        step="any"
        onChange={(event) =>
          setExponent(event.target.value)
        }
      />


      <ResultGrid>

        <ResultBox
          label="Result"
          value={
            result?.error
              ? result.error
              : formattedResult
          }
          copyValue={
            result && !result.error
              ? String(result.value)
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