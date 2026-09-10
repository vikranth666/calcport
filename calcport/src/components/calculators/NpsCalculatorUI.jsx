import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function NpsCalculatorUI() {

  const [monthlyContribution, setMonthlyContribution] =
    useState("");

  const [years, setYears] =
    useState("");

  const [returnRate, setReturnRate] =
    useState("10");

  const [annuityPercentage, setAnnuityPercentage] =
    useState("40");

  const [annuityRate, setAnnuityRate] =
    useState("6");


  const result = useMemo(() => {

    if (
      monthlyContribution === "" ||
      years === "" ||
      returnRate === ""
    ) {
      return null;
    }


    const monthly =
      Number(monthlyContribution);

    const investmentYears =
      Number(years);

    const annualReturn =
      Number(returnRate);

    const annuityPercent =
      Number(annuityPercentage);

    const annualAnnuityRate =
      Number(annuityRate);


    if (
      !Number.isFinite(monthly) ||
      !Number.isFinite(investmentYears) ||
      !Number.isFinite(annualReturn) ||
      !Number.isFinite(annuityPercent) ||
      !Number.isFinite(annualAnnuityRate)
    ) {
      return null;
    }


    if (
      monthly <= 0 ||
      investmentYears <= 0 ||
      annualReturn < 0 ||
      annuityPercent < 0 ||
      annuityPercent > 100 ||
      annualAnnuityRate <= 0
    ) {
      return null;
    }


    /*
      Convert annual return to
      monthly rate.
    */

    const monthlyRate =
      annualReturn / 100 / 12;


    const totalMonths =
      investmentYears * 12;


    /*
      Future value of regular
      monthly contributions.
    */

    const corpus =
      monthlyRate > 0

        ? monthly *
          (
            (
              Math.pow(
                1 + monthlyRate,
                totalMonths
              ) - 1
            ) /
            monthlyRate
          ) *
          (
            1 + monthlyRate
          )

        : monthly * totalMonths;


    /*
      Total amount contributed.
    */

    const totalInvestment =
      monthly * totalMonths;


    /*
      Estimated investment returns.
    */

    const estimatedReturns =
      corpus - totalInvestment;


    /*
      Estimated annuity amount.
    */

    const annuityAmount =
      corpus *
      annuityPercent /
      100;


    /*
      Estimated lump sum.
    */

    const lumpSum =
      corpus -
      annuityAmount;


    /*
      Approximate yearly annuity income.
    */

    const annualPension =
      annuityAmount *
      annualAnnuityRate /
      100;


    /*
      Approximate monthly pension.
    */

    const monthlyPension =
      annualPension / 12;


    return {

      corpus,

      totalInvestment,

      estimatedReturns,

      annuityAmount,

      lumpSum,

      monthlyPension,

    };

  }, [
    monthlyContribution,
    years,
    returnRate,
    annuityPercentage,
    annuityRate,
  ]);


  const resetCalculator = () => {

    setMonthlyContribution("");

    setYears("");

    setReturnRate("10");

    setAnnuityPercentage("40");

    setAnnuityRate("6");

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


      {/* MONTHLY CONTRIBUTION */}

      <div className="input-group">

        <label>
          Monthly Contribution
        </label>

        <input
          type="number"
          value={monthlyContribution}
          placeholder="e.g. 5000"
          onChange={(event) =>
            setMonthlyContribution(
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
          value={years}
          placeholder="e.g. 25"
          onChange={(event) =>
            setYears(
              event.target.value
            )
          }
        />

      </div>


      {/* EXPECTED RETURN */}

      <div className="input-group">

        <label>
          Expected Annual Return (%)
        </label>

        <input
          type="number"
          step="0.1"
          value={returnRate}
          onChange={(event) =>
            setReturnRate(
              event.target.value
            )
          }
        />

      </div>


      {/* ANNUITY PERCENTAGE */}

      <div className="input-group">

        <label>
          Annuity Portion (%)
        </label>

        <input
          type="number"
          step="1"
          value={annuityPercentage}
          onChange={(event) =>
            setAnnuityPercentage(
              event.target.value
            )
          }
        />

      </div>


      {/* ANNUITY RATE */}

      <div className="input-group">

        <label>
          Expected Annuity Rate (%)
        </label>

        <input
          type="number"
          step="0.1"
          value={annuityRate}
          onChange={(event) =>
            setAnnuityRate(
              event.target.value
            )
          }
        />

      </div>


      {/* RESULTS */}

      <ResultGrid>


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
          label="Estimated Returns"
          value={
            result
              ? formatCurrency(
                  result.estimatedReturns
                )
              : "—"
          }
        />


        <ResultBox
          label="Estimated NPS Corpus"
          value={
            result
              ? formatCurrency(
                  result.corpus
                )
              : "—"
          }
        />


        <ResultBox
          label="Estimated Annuity Amount"
          value={
            result
              ? formatCurrency(
                  result.annuityAmount
                )
              : "—"
          }
        />


        <ResultBox
          label="Estimated Lump Sum"
          value={
            result
              ? formatCurrency(
                  result.lumpSum
                )
              : "—"
          }
        />


        <ResultBox
          label="Approx. Monthly Pension"
          value={
            result
              ? formatCurrency(
                  result.monthlyPension
                )
              : "—"
          }
        />


      </ResultGrid>


      {/* EXPLANATION */}

      <div className="calculator-note">

        <strong>
          How the NPS calculation works
        </strong>


        <p>
          Your monthly contribution is
          projected over the selected
          investment period using the
          expected annual return.
        </p>


        <p>
          The estimated NPS corpus includes
          your contributions and the
          projected investment returns.
        </p>


        <p>
          The calculator then applies the
          selected annuity percentage to
          estimate the amount used for
          annuity purchase.
        </p>


        <p>
          The remaining amount is shown as
          the estimated lump-sum portion.
        </p>


        <p>
          The estimated monthly pension is
          calculated using the assumed
          annuity rate entered above.
        </p>


        <p>
          NPS returns are market-linked.
          Actual corpus, annuity amount and
          pension can differ from these
          estimates.
        </p>

      </div>


      {/* RESET */}

      <ResetButton
        onReset={resetCalculator}
      />


    </CalculatorContainer>

  );

}