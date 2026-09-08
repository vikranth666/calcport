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

export default function SalaryCalculatorUI() {
  const [annualSalary, setAnnualSalary] =
    useState("");

  const [annualDeductions, setAnnualDeductions] =
    useState("");

  const result = useMemo(() => {
    if (
      annualSalary === "" ||
      annualDeductions === ""
    ) {
      return null;
    }

    const salary = Number(annualSalary);
    const deductions = Number(annualDeductions);

    if (
      !Number.isFinite(salary) ||
      !Number.isFinite(deductions) ||
      salary < 0 ||
      deductions < 0
    ) {
      return null;
    }

    const takeHomeAnnual =
      Math.max(
        0,
        salary - deductions
      );

    return {
      monthlyGross:
        salary / 12,

      monthlyDeductions:
        deductions / 12,

      annualTakeHome:
        takeHomeAnnual,

      monthlyTakeHome:
        takeHomeAnnual / 12,
    };
  }, [
    annualSalary,
    annualDeductions,
  ]);

  const resetCalculator = () => {
    setAnnualSalary("");
    setAnnualDeductions("");
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <CalculatorContainer>

      <InputField
        label="Gross Annual Salary"
        value={annualSalary}
        placeholder="e.g. 600000"
        min={0}
        onChange={(event) =>
          setAnnualSalary(
            event.target.value
          )
        }
      />

      <InputField
        label="Estimated Annual Deductions"
        value={annualDeductions}
        placeholder="e.g. 60000"
        min={0}
        onChange={(event) =>
          setAnnualDeductions(
            event.target.value
          )
        }
      />

      <ResultGrid>

        <ResultBox
          label="Monthly Gross Salary"
          value={
            result
              ? `₹${formatCurrency(
                  result.monthlyGross
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.monthlyGross
                )
              : ""
          }
        />

        <ResultBox
          label="Monthly Deductions"
          value={
            result
              ? `₹${formatCurrency(
                  result.monthlyDeductions
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.monthlyDeductions
                )
              : ""
          }
        />

        <ResultBox
          label="Annual Take-Home"
          value={
            result
              ? `₹${formatCurrency(
                  result.annualTakeHome
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.annualTakeHome
                )
              : ""
          }
        />

        <ResultBox
          label="Monthly Take-Home"
          value={
            result
              ? `₹${formatCurrency(
                  result.monthlyTakeHome
                )}`
              : "—"
          }
          copyValue={
            result
              ? formatCurrency(
                  result.monthlyTakeHome
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