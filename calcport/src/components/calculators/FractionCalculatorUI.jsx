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

export default function FractionCalculatorUI() {
  const [numerator1, setNumerator1] =
    useState("");

  const [denominator1, setDenominator1] =
    useState("");

  const [numerator2, setNumerator2] =
    useState("");

  const [denominator2, setDenominator2] =
    useState("");

  const [operation, setOperation] =
    useState("+");

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

  const simplifyFraction = (numerator, denominator) => {
    if (denominator === 0) {
      return null;
    }

    if (numerator === 0) {
      return {
        numerator: 0,
        denominator: 1,
      };
    }

    if (denominator < 0) {
      numerator *= -1;
      denominator *= -1;
    }

    const divisor =
      gcd(numerator, denominator);

    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor,
    };
  };

  const result = useMemo(() => {
    if (
      numerator1 === "" ||
      denominator1 === "" ||
      numerator2 === "" ||
      denominator2 === ""
    ) {
      return null;
    }

    const n1 = Number(numerator1);
    const d1 = Number(denominator1);
    const n2 = Number(numerator2);
    const d2 = Number(denominator2);

    if (
      !Number.isInteger(n1) ||
      !Number.isInteger(d1) ||
      !Number.isInteger(n2) ||
      !Number.isInteger(d2)
    ) {
      return null;
    }

    if (d1 === 0 || d2 === 0) {
      return null;
    }

    let numerator;
    let denominator;

    switch (operation) {
      case "+":
        numerator =
          n1 * d2 + n2 * d1;
        denominator =
          d1 * d2;
        break;

      case "-":
        numerator =
          n1 * d2 - n2 * d1;
        denominator =
          d1 * d2;
        break;

      case "*":
        numerator =
          n1 * n2;
        denominator =
          d1 * d2;
        break;

      case "/":
        if (n2 === 0) {
          return {
            error:
              "Cannot divide by zero.",
          };
        }

        numerator =
          n1 * d2;
        denominator =
          d1 * n2;
        break;

      default:
        return null;
    }

    const simplified =
      simplifyFraction(
        numerator,
        denominator
      );

    if (!simplified) {
      return {
        error:
          "Invalid fraction.",
      };
    }

    return {
      numerator:
        simplified.numerator,
      denominator:
        simplified.denominator,
    };
  }, [
    numerator1,
    denominator1,
    numerator2,
    denominator2,
    operation,
  ]);

  const resetCalculator = () => {
    setNumerator1("");
    setDenominator1("");
    setNumerator2("");
    setDenominator2("");
    setOperation("+");
  };

  const fractionText = (fraction) => {
    if (fraction.denominator === 1) {
      return `${fraction.numerator}`;
    }

    return `${fraction.numerator}/${fraction.denominator}`;
  };

  const decimalValue =
    result &&
    !result.error &&
    result.denominator !== 0
      ? result.numerator /
        result.denominator
      : null;

  return (
    <CalculatorContainer>

      <h3>
        First Fraction
      </h3>

      <InputField
        label="Numerator"
        value={numerator1}
        placeholder="e.g. 1"
        step="1"
        onChange={(event) =>
          setNumerator1(
            event.target.value
          )
        }
      />

      <InputField
        label="Denominator"
        value={denominator1}
        placeholder="e.g. 2"
        step="1"
        onChange={(event) =>
          setDenominator1(
            event.target.value
          )
        }
      />

      <div className="input-field">
        <label>
          Operation
        </label>

        <select
          value={operation}
          onChange={(event) =>
            setOperation(
              event.target.value
            )
          }
        >
          <option value="+">
            Addition (+)
          </option>

          <option value="-">
            Subtraction (-)
          </option>

          <option value="*">
            Multiplication (×)
          </option>

          <option value="/">
            Division (÷)
          </option>
        </select>
      </div>

      <h3>
        Second Fraction
      </h3>

      <InputField
        label="Numerator"
        value={numerator2}
        placeholder="e.g. 1"
        step="1"
        onChange={(event) =>
          setNumerator2(
            event.target.value
          )
        }
      />

      <InputField
        label="Denominator"
        value={denominator2}
        placeholder="e.g. 4"
        step="1"
        onChange={(event) =>
          setDenominator2(
            event.target.value
          )
        }
      />

      <ResultGrid>

        <ResultBox
          label="Result"
          value={
            result?.error
              ? result.error
              : result
              ? fractionText(result)
              : "—"
          }
          copyValue={
            result &&
            !result.error
              ? fractionText(result)
              : ""
          }
        />

        <ResultBox
          label="Decimal"
          value={
            decimalValue !== null
              ? decimalValue.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 10,
                  }
                )
              : "—"
          }
          copyValue={
            decimalValue !== null
              ? String(decimalValue)
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