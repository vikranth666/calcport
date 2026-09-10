import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function GoldLoanCalculatorUI() {

  const [goldWeight, setGoldWeight] =
    useState("");

  const [purity, setPurity] =
    useState("22");

  const [goldRate, setGoldRate] =
    useState("");

  const [ltv, setLtv] =
    useState("75");

  const [interestRate, setInterestRate] =
    useState("");

  const [tenure, setTenure] =
    useState("12");


  const result = useMemo(() => {

    if (
      goldWeight === "" ||
      goldRate === "" ||
      interestRate === "" ||
      tenure === ""
    ) {
      return null;
    }


    const weight =
      Number(goldWeight);

    const selectedPurity =
      Number(purity);

    const rate =
      Number(goldRate);

    const loanToValue =
      Number(ltv);

    const annualInterest =
      Number(interestRate);

    const months =
      Number(tenure);


    if (
      !Number.isFinite(weight) ||
      !Number.isFinite(selectedPurity) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(loanToValue) ||
      !Number.isFinite(annualInterest) ||
      !Number.isFinite(months)
    ) {
      return null;
    }


    if (
      weight <= 0 ||
      rate <= 0 ||
      selectedPurity <= 0 ||
      selectedPurity > 100 ||
      loanToValue <= 0 ||
      loanToValue > 100 ||
      annualInterest < 0 ||
      months <= 0
    ) {
      return null;
    }


    /*
      Gold rate is entered per gram
      for 24K gold.

      Estimated pure-gold value:

      Weight × Rate × Purity / 24
    */


    const estimatedGoldValue =
      weight *
      rate *
      (selectedPurity / 24);


    /*
      Estimated eligible loan:

      Gold Value × LTV / 100
    */


    const estimatedLoanAmount =
      estimatedGoldValue *
      (loanToValue / 100);


    /*
      EMI formula:

      EMI =
      P × r × (1+r)^n
      -----------------
      (1+r)^n - 1

      where:

      P = principal
      r = monthly interest rate
      n = number of months
    */


    const monthlyRate =
      annualInterest /
      100 /
      12;


    let emi;


    if (monthlyRate === 0) {

      emi =
        estimatedLoanAmount /
        months;

    } else {

      const factor =
        Math.pow(
          1 + monthlyRate,
          months
        );


      emi =
        estimatedLoanAmount *
        monthlyRate *
        factor /
        (factor - 1);

    }


    const totalPayment =
      emi * months;


    const totalInterest =
      totalPayment -
      estimatedLoanAmount;


    return {

      estimatedGoldValue,

      estimatedLoanAmount,

      emi,

      totalPayment,

      totalInterest,

    };

  }, [
    goldWeight,
    purity,
    goldRate,
    ltv,
    interestRate,
    tenure,
  ]);


  const formatCurrency = (value) => {

    return `₹${value.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 0,
      }
    )}`;

  };


  const resetCalculator = () => {

    setGoldWeight("");

    setPurity("22");

    setGoldRate("");

    setLtv("75");

    setInterestRate("");

    setTenure("12");

  };


  return (

    <CalculatorContainer>


      {/* GOLD WEIGHT */}

      <div className="input-group">

        <label>
          Gold Weight (grams)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={goldWeight}
          placeholder="e.g. 50"
          onChange={(event) =>
            setGoldWeight(
              event.target.value
            )
          }
        />

      </div>


      {/* PURITY */}

      <div className="input-group">

        <label>
          Gold Purity
        </label>

        <select
          value={purity}
          onChange={(event) =>
            setPurity(
              event.target.value
            )
          }
        >

          <option value="24">
            24K
          </option>

          <option value="22">
            22K
          </option>

          <option value="18">
            18K
          </option>

          <option value="14">
            14K
          </option>

        </select>

      </div>


      {/* GOLD RATE */}

      <div className="input-group">

        <label>
          Gold Rate (₹ per gram for 24K)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={goldRate}
          placeholder="e.g. 10000"
          onChange={(event) =>
            setGoldRate(
              event.target.value
            )
          }
        />

      </div>


      {/* LTV */}

      <div className="input-group">

        <label>
          Loan-to-Value (LTV %)
        </label>

        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={ltv}
          onChange={(event) =>
            setLtv(
              event.target.value
            )
          }
        />

      </div>


      {/* INTEREST */}

      <div className="input-group">

        <label>
          Annual Interest Rate (%)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={interestRate}
          placeholder="e.g. 12"
          onChange={(event) =>
            setInterestRate(
              event.target.value
            )
          }
        />

      </div>


      {/* TENURE */}

      <div className="input-group">

        <label>
          Loan Tenure (Months)
        </label>

        <input
          type="number"
          min="1"
          step="1"
          value={tenure}
          onChange={(event) =>
            setTenure(
              event.target.value
            )
          }
        />

      </div>


      {/* RESULTS */}

      <ResultGrid>

        <ResultBox
          label="Estimated Gold Value"
          value={
            result
              ? formatCurrency(
                  result.estimatedGoldValue
                )
              : "—"
          }
        />


        <ResultBox
          label="Estimated Loan Amount"
          value={
            result
              ? formatCurrency(
                  result.estimatedLoanAmount
                )
              : "—"
          }
        />


        <ResultBox
          label="Estimated Monthly EMI"
          value={
            result
              ? formatCurrency(
                  result.emi
                )
              : "—"
          }
        />


        <ResultBox
          label="Total Interest"
          value={
            result
              ? formatCurrency(
                  result.totalInterest
                )
              : "—"
          }
        />


        <ResultBox
          label="Total Repayment"
          value={
            result
              ? formatCurrency(
                  result.totalPayment
                )
              : "—"
          }
        />

      </ResultGrid>


      {/* EXPLANATION */}

      <div className="calculator-note">

        <strong>
          How the Gold Loan Calculator works
        </strong>

        <p>
          First, the calculator estimates
          the value of your gold using its
          weight, purity and the entered
          24K gold rate.
        </p>

        <p>
          Estimated Gold Value =
          Weight × Gold Rate ×
          (Purity ÷ 24)
        </p>

        <p>
          The estimated loan amount is then
          calculated using the selected
          loan-to-value percentage.
        </p>

        <p>
          Estimated Loan Amount =
          Gold Value × LTV
        </p>

        <p>
          Finally, the calculator estimates
          the monthly EMI using the loan
          amount, annual interest rate and
          tenure.
        </p>

        <p>
          Actual lender valuations, eligible
          loan amounts, fees, interest rates
          and repayment structures may differ.
        </p>

      </div>


      {/* RESET */}

      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}