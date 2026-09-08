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

export default function RdCalculatorUI() {
  const [monthlyDeposit, setMonthlyDeposit] =
    useState("");

  const [rate, setRate] =
    useState("");

  const [years, setYears] =
    useState("");

  const result = useMemo(() => {
    if (
      monthlyDeposit === "" ||
      rate === "" ||
      years === ""
    ) {
      return null;
    }

    const p = Number(monthlyDeposit);
    const annualRate = Number(rate);
    const t = Number(years);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(t) ||
      p < 0 ||
      annualRate < 0 ||
      t < 0
    ) {
      return null;
    }

    const months = Math.round(t * 12);

    if (months <= 0) {
      return {
        investment: 0,
        interest: 0,
        maturity: 0,
      };
    }

    const quarterlyRate =
      annualRate / 400;

    let maturity;

    if (quarterlyRate === 0) {
      maturity = p * months;
    } else {
      maturity =
        p *
        (
          (Math.pow(
            1 + quarterlyRate,
            months / 3
          ) -
            1)
          / quarterlyRate
        );
    }

    const investment =
      p * months;

    const interest =
      maturity - investment;

    return {
      investment,
      interest,
      maturity,
    };
  }, [
    monthlyDeposit,
    rate,
    years,
  ]);

  const resetCalculator = () => {
    setMonthlyDeposit("");
    setRate("");
    setYears("");
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <CalculatorContainer>

      <InputField
        label="Monthly Deposit"
        value={monthlyDeposit}
        placeholder="e.g. 5000"
        min={0}
        onChange={(event) =>
          setMonthlyDeposit(
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

      <ResultGrid>

        <ResultBox
          label="Total Investment"
          value={
            result
              ? `₹${formatCurrency(
                  result.investment
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.investment
                )
              : ""
          }
        />

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