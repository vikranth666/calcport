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

export default function SipCalculatorUI() {
  const [monthlyInvestment, setMonthlyInvestment] =
    useState("");

  const [rate, setRate] =
    useState("");

  const [years, setYears] =
    useState("");

  const result = useMemo(() => {
    if (
      monthlyInvestment === "" ||
      rate === "" ||
      years === ""
    ) {
      return null;
    }

    const p = Number(monthlyInvestment);
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

    const months = t * 12;

    if (months <= 0) {
      return {
        investment: 0,
        returns: 0,
        maturity: 0,
      };
    }

    const monthlyRate =
      annualRate / 12 / 100;

    let maturity;

    if (monthlyRate === 0) {
      maturity = p * months;
    } else {
      maturity =
        p *
        (
          (Math.pow(
            1 + monthlyRate,
            months
          ) -
            1) /
          monthlyRate
        ) *
        (1 + monthlyRate);
    }

    const investment =
      p * months;

    const returns =
      maturity - investment;

    return {
      investment,
      returns,
      maturity,
    };
  }, [
    monthlyInvestment,
    rate,
    years,
  ]);

  const resetCalculator = () => {
    setMonthlyInvestment("");
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
        label="Monthly Investment"
        value={monthlyInvestment}
        placeholder="e.g. 5000"
        min={0}
        onChange={(event) =>
          setMonthlyInvestment(
            event.target.value
          )
        }
      />

      <InputField
        label="Expected Return Rate (% per year)"
        value={rate}
        placeholder="e.g. 12"
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
        placeholder="e.g. 10"
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
          label="Estimated Returns"
          value={
            result
              ? `₹${formatCurrency(
                  result.returns
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.returns
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