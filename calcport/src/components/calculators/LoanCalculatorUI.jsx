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

export default function LoanCalculatorUI() {
  const [loanAmount, setLoanAmount] =
    useState("");

  const [rate, setRate] =
    useState("");

  const [years, setYears] =
    useState("");

  const result = useMemo(() => {
    if (
      loanAmount === "" ||
      rate === "" ||
      years === ""
    ) {
      return null;
    }

    const principal = Number(loanAmount);
    const annualRate = Number(rate);
    const tenureYears = Number(years);

    if (
      !Number.isFinite(principal) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(tenureYears) ||
      principal < 0 ||
      annualRate < 0 ||
      tenureYears <= 0
    ) {
      return null;
    }

    const months =
      Math.round(tenureYears * 12);

    if (months <= 0) {
      return null;
    }

    const monthlyRate =
      annualRate / 12 / 100;

    let emi;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        principal *
        monthlyRate *
        Math.pow(
          1 + monthlyRate,
          months
        ) /
        (
          Math.pow(
            1 + monthlyRate,
            months
          ) - 1
        );
    }

    const totalPayment =
      emi * months;

    const totalInterest =
      totalPayment - principal;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  }, [
    loanAmount,
    rate,
    years,
  ]);

  const resetCalculator = () => {
    setLoanAmount("");
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
        label="Loan Amount"
        value={loanAmount}
        placeholder="e.g. 500000"
        min={0}
        onChange={(event) =>
          setLoanAmount(
            event.target.value
          )
        }
      />

      <InputField
        label="Interest Rate (% per year)"
        value={rate}
        placeholder="e.g. 8.5"
        min={0}
        step="0.01"
        onChange={(event) =>
          setRate(
            event.target.value
          )
        }
      />

      <InputField
        label="Loan Tenure (Years)"
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
          label="Monthly EMI"
          value={
            result
              ? `₹${formatCurrency(
                  result.emi
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.emi
                )
              : ""
          }
        />

        <ResultBox
          label="Total Interest"
          value={
            result
              ? `₹${formatCurrency(
                  result.totalInterest
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.totalInterest
                )
              : ""
          }
        />

        <ResultBox
          label="Total Payment"
          value={
            result
              ? `₹${formatCurrency(
                  result.totalPayment
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.totalPayment
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