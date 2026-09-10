import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function PpfCalculatorUI() {

  const [annualInvestment, setAnnualInvestment] =
    useState("");

  const [interestRate, setInterestRate] =
    useState("7.1");

  const [years, setYears] =
    useState("15");


  const result = useMemo(() => {

    if (
      annualInvestment === "" ||
      interestRate === "" ||
      years === ""
    ) {
      return null;
    }


    const investment =
      Number(annualInvestment);

    const rate =
      Number(interestRate);

    const investmentYears =
      Number(years);


    if (
      !Number.isFinite(investment) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(investmentYears) ||
      investment <= 0 ||
      rate < 0 ||
      investmentYears <= 0
    ) {
      return null;
    }


    /*
      PPF estimation

      Each yearly contribution is treated
      as being invested at the beginning
      of the year.

      Future value of annual contributions:

      FV =
      P × [((1 + r)^n - 1) / r] × (1 + r)

      where:

      P = annual contribution
      r = annual interest rate
      n = number of years
    */


    const annualRate =
      rate / 100;


    let maturityValue;


    if (annualRate === 0) {

      maturityValue =
        investment *
        investmentYears;

    } else {

      maturityValue =
        investment *
        (
          (
            Math.pow(
              1 + annualRate,
              investmentYears
            ) - 1
          ) /
          annualRate
        ) *
        (
          1 + annualRate
        );

    }


    const totalInvestment =
      investment *
      investmentYears;


    const totalInterest =
      maturityValue -
      totalInvestment;


    return {

      maturityValue,

      totalInvestment,

      totalInterest,

      annualInvestment: investment,

      investmentYears,

    };

  }, [
    annualInvestment,
    interestRate,
    years,
  ]);


  const resetCalculator = () => {

    setAnnualInvestment("");

    setInterestRate("7.1");

    setYears("15");

  };


  const formatCurrency = (value) => {

    return `₹${value.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 0,
      }
    )}`;

  };


  return (

    <CalculatorContainer>


      {/* ANNUAL INVESTMENT */}

      <div className="input-group">

        <label>
          Annual Investment
        </label>

        <input
          type="number"
          min="0"
          value={annualInvestment}
          placeholder="e.g. 150000"
          onChange={(event) =>
            setAnnualInvestment(
              event.target.value
            )
          }
        />

      </div>


      {/* INTEREST RATE */}

      <div className="input-group">

        <label>
          Annual Interest Rate (%)
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={interestRate}
          onChange={(event) =>
            setInterestRate(
              event.target.value
            )
          }
        />

      </div>


      {/* INVESTMENT PERIOD */}

      <div className="input-group">

        <label>
          Investment Period (Years)
        </label>

        <input
          type="number"
          min="1"
          value={years}
          placeholder="e.g. 15"
          onChange={(event) =>
            setYears(
              event.target.value
            )
          }
        />

      </div>


      {/* RESULTS */}

      <ResultGrid>


        <ResultBox
          label="Estimated Maturity Value"
          value={
            result
              ? formatCurrency(
                  result.maturityValue
                )
              : "—"
          }
        />


        <ResultBox
          label="Total Investment"
          value={
            result
              ? formatCurrency(
                  result.totalInvestment
                )
              : "—"
          }
        />


        <ResultBox
          label="Estimated Interest Earned"
          value={
            result
              ? formatCurrency(
                  result.totalInterest
                )
              : "—"
          }
        />


        <ResultBox
          label="Annual Investment"
          value={
            result
              ? formatCurrency(
                  result.annualInvestment
                )
              : "—"
          }
        />


      </ResultGrid>


      {/* EXPLANATION */}

      <div className="calculator-note">

        <strong>
          How the PPF calculation works
        </strong>

        <p>
          The calculator estimates the
          future value of regular annual
          PPF contributions using the
          interest rate entered above.
        </p>

        <p>
          Total investment is calculated
          by multiplying the annual
          contribution by the number of
          investment years.
        </p>

        <p>
          Estimated interest is the
          difference between the projected
          maturity value and total
          contributions.
        </p>

        <p>
          The calculation is an estimate.
          Actual PPF interest and maturity
          value depend on applicable rules,
          interest rates and contribution
          timing.
        </p>

      </div>


      {/* RESET */}

      <ResetButton
        onReset={resetCalculator}
      />


    </CalculatorContainer>

  );

}