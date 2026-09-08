import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";

export default function TaxCalculatorUI() {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [taxRate, setTaxRate] = useState("");

  const result = useMemo(() => {
    const incomeValue = Number(income);
    const deductionsValue = Number(deductions || 0);
    const taxRateValue = Number(taxRate);

    if (
      !Number.isFinite(incomeValue) ||
      !Number.isFinite(deductionsValue) ||
      !Number.isFinite(taxRateValue) ||
      incomeValue < 0 ||
      deductionsValue < 0 ||
      taxRateValue < 0 ||
      taxRateValue > 100
    ) {
      return null;
    }

    if (!income.trim() || !taxRate.trim()) {
      return null;
    }

    const taxableIncome = Math.max(
      incomeValue - deductionsValue,
      0
    );

    const estimatedTax =
      taxableIncome * (taxRateValue / 100);

    const incomeAfterTax =
      incomeValue - estimatedTax;

    return {
      taxableIncome,
      estimatedTax,
      incomeAfterTax,
    };
  }, [income, deductions, taxRate]);

  const formatNumber = (value) => {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const resetCalculator = () => {
    setIncome("");
    setDeductions("");
    setTaxRate("");
  };

  return (
    <CalculatorContainer>
      <InputField
        label="Annual Income (₹)"
        value={income}
        placeholder="e.g. 800000"
        min={0}
        step="0.01"
        onChange={(event) =>
          setIncome(event.target.value)
        }
      />

      <InputField
        label="Deductions (₹)"
        value={deductions}
        placeholder="e.g. 50000"
        min={0}
        step="0.01"
        onChange={(event) =>
          setDeductions(event.target.value)
        }
      />

      <InputField
        label="Tax Rate (%)"
        value={taxRate}
        placeholder="e.g. 20"
        min={0}
        max={100}
        step="0.01"
        onChange={(event) =>
          setTaxRate(event.target.value)
        }
      />

      <ResultGrid>
        <ResultBox
          label="Taxable Income"
          value={
            result
              ? `₹${formatNumber(result.taxableIncome)}`
              : "—"
          }
          copyValue={
            result
              ? String(result.taxableIncome)
              : ""
          }
        />

        <ResultBox
          label="Estimated Tax"
          value={
            result
              ? `₹${formatNumber(result.estimatedTax)}`
              : "—"
          }
          copyValue={
            result
              ? String(result.estimatedTax)
              : ""
          }
        />

        <ResultBox
          label="Income After Tax"
          value={
            result
              ? `₹${formatNumber(result.incomeAfterTax)}`
              : "—"
          }
          copyValue={
            result
              ? String(result.incomeAfterTax)
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