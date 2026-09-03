import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import AdPlaceholder from "../AdPlaceholder";
import ResetButton from "../ResetButton";
import ResultGrid from "../ResultGrid";
/* import CalculateButton from "../CalculateButton"; */

export default function EmiCalculatorUI() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");

  const resetCalculator = () => {
  setLoanAmount("");
  setInterestRate("");
  setLoanTenure("");
};

  const result = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(loanTenure);

    if (
      principal <= 0 ||
      annualRate < 0 ||
      years <= 0
    ) {
      return {
        emi: 0,
        totalInterest: 0,
        totalPayment: 0,
      };
    }

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    let emi;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi,
      totalInterest,
      totalPayment,
    };
  }, [loanAmount, interestRate, loanTenure]);


  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
      <CalculatorContainer>
        <InputField
          label="Loan Amount (₹)"
          placeholder="Enter loan amount"
          value={loanAmount}
          onChange={(event) =>
            setLoanAmount(event.target.value)
          }
        />

        <InputField
          label="Interest Rate (% per year)"
          placeholder="Enter annual interest rate"
          value={interestRate}
          onChange={(event) =>
            setInterestRate(event.target.value)
          }
        />

        <InputField
          label="Loan Tenure (Years)"
          placeholder="Enter loan tenure"
          value={loanTenure}
          onChange={(event) =>
            setLoanTenure(event.target.value)
          }
        />

       <ResultGrid>
  <ResultBox
    label="Monthly EMI"
    value={
      loanAmount &&
      interestRate &&
      loanTenure
        ? formatCurrency(result.emi)
        : "—"
    }
    copyValue={
      loanAmount &&
      interestRate &&
      loanTenure
        ? formatCurrency(result.emi)
        : "—"
    }
  />

  <ResultBox
    label="Total Interest"
    value={
      loanAmount &&
      interestRate &&
      loanTenure
        ? formatCurrency(
            result.totalInterest
          )
        : "—"
    }
    copyValue={
      loanAmount &&
      interestRate &&
      loanTenure
        ? formatCurrency(
            result.totalInterest
          )
        : "—"
    }
  />

  <ResultBox
    label="Total Payment"
    value={
      loanAmount &&
      interestRate &&
      loanTenure
        ? formatCurrency(
            result.totalPayment
          )
        : "—"
    }
    copyValue={
      loanAmount &&
      interestRate &&
      loanTenure
        ? formatCurrency(
            result.totalPayment
          )
        : "—"
    }
  />
</ResultGrid>

         <ResetButton
            onReset={resetCalculator}
          />
      </CalculatorContainer>

      <AdPlaceholder />

        
    </>
  );
}