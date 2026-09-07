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

export default function SimpleInterestCalculatorUI() {
  const [principal, setPrincipal] =
    useState("");

  const [rate, setRate] =
    useState("");

  const [time, setTime] =
    useState("");

  const result = useMemo(() => {
    if (
      principal === "" ||
      rate === "" ||
      time === ""
    ) {
      return null;
    }

    const p = Number(principal);
    const r = Number(rate);
    const t = Number(time);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(r) ||
      !Number.isFinite(t) ||
      p < 0 ||
      r < 0 ||
      t < 0
    ) {
      return null;
    }

    const interest =
      (p * r * t) / 100;

    const total =
      p + interest;

    return {
      interest,
      total,
    };
  }, [principal, rate, time]);

  const resetCalculator = () => {
    setPrincipal("");
    setRate("");
    setTime("");
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <CalculatorContainer>

      <InputField
        label="Principal Amount"
        value={principal}
        placeholder="e.g. 10000"
        min={0}
        onChange={(event) =>
          setPrincipal(
            event.target.value
          )
        }
      />

      <InputField
        label="Interest Rate"
        value={rate}
        placeholder="e.g. 5"
        min={0}
        step="0.01"
        onChange={(event) =>
          setRate(
            event.target.value
          )
        }
      />

      <InputField
        label="Time Period"
        value={time}
        placeholder="e.g. 2"
        min={0}
        step="0.01"
        onChange={(event) =>
          setTime(
            event.target.value
          )
        }
      />

      <ResultGrid>

        <ResultBox
          label="Simple Interest"
          value={
            result
              ? `₹${formatCurrency(
                  result.interest
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.interest
                )
              : ""
          }
        />

        <ResultBox
          label="Total Amount"
          value={
            result
              ? `₹${formatCurrency(
                  result.total
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.total
                )
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