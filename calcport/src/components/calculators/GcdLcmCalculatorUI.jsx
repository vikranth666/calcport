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

export default function GcdLcmCalculatorUI() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const gcd = (a, b) => {
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
    if (number1 === "" || number2 === "") {
      return null;
    }

    const a = Number(number1);
    const b = Number(number2);

    if (
      !Number.isInteger(a) ||
      !Number.isInteger(b)
    ) {
      return null;
    }

    if (a === 0 && b === 0) {
      return {
        error: "GCD and LCM are undefined for 0 and 0.",
      };
    }

    const greatestCommonDivisor = gcd(a, b);

    const leastCommonMultiple =
      greatestCommonDivisor === 0
        ? 0
        : Math.abs((a * b) / greatestCommonDivisor);

    return {
      gcd: greatestCommonDivisor,
      lcm: leastCommonMultiple,
    };
  }, [number1, number2]);

  const resetCalculator = () => {
    setNumber1("");
    setNumber2("");
  };

  return (
    <CalculatorContainer>

      <InputField
        label="First Number"
        value={number1}
        placeholder="e.g. 12"
        step="1"
        onChange={(event) =>
          setNumber1(event.target.value)
        }
      />

      <InputField
        label="Second Number"
        value={number2}
        placeholder="e.g. 18"
        step="1"
        onChange={(event) =>
          setNumber2(event.target.value)
        }
      />

      <ResultGrid>

        <ResultBox
          label="GCD"
          value={
            result?.error
              ? result.error
              : result
              ? result.gcd.toLocaleString("en-IN")
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.gcd)
              : ""
          }
        />

        <ResultBox
          label="LCM"
          value={
            result?.error
              ? "—"
              : result
              ? result.lcm.toLocaleString("en-IN")
              : "—"
          }
          copyValue={
            result && !result.error
              ? String(result.lcm)
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