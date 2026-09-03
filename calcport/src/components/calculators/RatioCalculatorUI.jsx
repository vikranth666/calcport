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

export default function RatioCalculatorUI() {
  const [firstNumber, setFirstNumber] =
    useState("");

  const [secondNumber, setSecondNumber] =
    useState("");

  const getGCD = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }

    return a;
  };

  const result = useMemo(() => {
    if (
      firstNumber === "" ||
      secondNumber === ""
    ) {
      return null;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);

    if (
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {
      return null;
    }

    if (first <= 0 || second <= 0) {
      return null;
    }

    // Ratio simplification works best
    // with whole numbers for this version
    if (
      !Number.isInteger(first) ||
      !Number.isInteger(second)
    ) {
      return null;
    }

    const gcd = getGCD(first, second);

    return {
      first: first / gcd,
      second: second / gcd,
    };
  }, [firstNumber, secondNumber]);

  const resetCalculator = () => {
    setFirstNumber("");
    setSecondNumber("");
  };

  return (
    <CalculatorContainer>

      <InputField
        label="First Number"
        value={firstNumber}
        placeholder="e.g. 10"
        min={1}
        onChange={(event) =>
          setFirstNumber(event.target.value)
        }
      />

      <InputField
        label="Second Number"
        value={secondNumber}
        placeholder="e.g. 20"
        min={1}
        onChange={(event) =>
          setSecondNumber(event.target.value)
        }
      />

      <ResultGrid>

        <ResultBox
          label="Simplified Ratio"
          value={
            result
              ? `${result.first}:${result.second}`
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