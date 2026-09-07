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

export default function CompoundInterestCalculatorUI() {
  const [principal, setPrincipal] =
    useState("");

  const [rate, setRate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [frequency, setFrequency] =
    useState("1");

  const result = useMemo(() => {
    if (
      principal === "" ||
      rate === "" ||
      time === "" ||
      frequency === ""
    ) {
      return null;
    }

    const p = Number(principal);
    const r = Number(rate);
    const t = Number(time);
    const n = Number(frequency);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(r) ||
      !Number.isFinite(t) ||
      !Number.isFinite(n) ||
      p < 0 ||
      r < 0 ||
      t < 0 ||
      n <= 0
    ) {
      return null;
    }

    const amount =
      p *
      Math.pow(
        1 + r / (100 * n),
        n * t
      );

    const interest =
      amount - p;

    return {
      interest,
      amount,
    };
  }, [
    principal,
    rate,
    time,
    frequency,
  ]);

  const resetCalculator = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setFrequency("1");
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
        label="Interest Rate (% per year)"
        value={rate}
        placeholder="e.g. 8"
        min={0}
        step="0.01"
        onChange={(event) =>
          setRate(
            event.target.value
          )
        }
      />

      <InputField
        label="Time Period (Years)"
        value={time}
        placeholder="e.g. 5"
        min={0}
        step="0.01"
        onChange={(event) =>
          setTime(
            event.target.value
          )
        }
      />

      <div className="input-field">
        <label>
          Compounding Frequency
        </label>

        <select
          value={frequency}
          onChange={(event) =>
            setFrequency(
              event.target.value
            )
          }
        >
          <option value="1">
            Annually
          </option>

          <option value="2">
            Half-Yearly
          </option>

          <option value="4">
            Quarterly
          </option>

          <option value="12">
            Monthly
          </option>

          <option value="365">
            Daily
          </option>
        </select>
      </div>

      <ResultGrid>

        <ResultBox
          label="Compound Interest"
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
                  result.amount
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.amount
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