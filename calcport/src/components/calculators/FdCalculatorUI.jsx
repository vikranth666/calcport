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

export default function FdCalculatorUI() {
  const [principal, setPrincipal] =
    useState("");

  const [rate, setRate] =
    useState("");

  const [years, setYears] =
    useState("");

  const [frequency, setFrequency] =
    useState("4");

  const result = useMemo(() => {
    if (
      principal === "" ||
      rate === "" ||
      years === "" ||
      frequency === ""
    ) {
      return null;
    }

    const p = Number(principal);
    const r = Number(rate);
    const t = Number(years);
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

    const maturity =
      p *
      Math.pow(
        1 + r / (100 * n),
        n * t
      );

    const interest =
      maturity - p;

    return {
      interest,
      maturity,
    };
  }, [
    principal,
    rate,
    years,
    frequency,
  ]);

  const resetCalculator = () => {
    setPrincipal("");
    setRate("");
    setYears("");
    setFrequency("4");
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <CalculatorContainer>

      <InputField
        label="Deposit Amount"
        value={principal}
        placeholder="e.g. 100000"
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
        placeholder="e.g. 7"
        min={0}
        step="0.01"
        onChange={(event) =>
          setRate(
            event.target.value
          )
        }
      />

      <InputField
        label="Investment Period (Years)"
        value={years}
        placeholder="e.g. 5"
        min={0}
        step="0.01"
        onChange={(event) =>
          setYears(
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
        </select>
      </div>

      <ResultGrid>

        <ResultBox
          label="Interest Earned"
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
          label="Maturity Amount"
          value={
            result
              ? `₹${formatCurrency(
                  result.maturity
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.maturity
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