import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function GratuityCalculatorUI() {

  const [basicSalary, setBasicSalary] =
    useState("");

  const [da, setDa] =
    useState("");

  const [yearsOfService, setYearsOfService] =
    useState("");

  const [monthsOfService, setMonthsOfService] =
    useState("0");


  const result = useMemo(() => {

    if (
      basicSalary === "" ||
      yearsOfService === ""
    ) {
      return null;
    }


    const basic =
      Number(basicSalary);

    const daAmount =
      da === ""
        ? 0
        : Number(da);

    const years =
      Number(yearsOfService);

    const months =
      Number(monthsOfService);


    if (
      !Number.isFinite(basic) ||
      !Number.isFinite(daAmount) ||
      !Number.isFinite(years) ||
      !Number.isFinite(months)
    ) {
      return null;
    }


    if (
      basic < 0 ||
      daAmount < 0 ||
      years < 0 ||
      months < 0 ||
      months > 11
    ) {
      return null;
    }


    /*
      Last Drawn Salary
      = Basic + DA
    */

    const lastDrawnSalary =
      basic + daAmount;


    /*
      Gratuity calculation

      Common formula:

      Salary × 15 ×
      Completed Years / 26

      For the commonly used
      rounding convention:

      If the additional service
      period exceeds 6 months,
      it can be treated as another
      completed year.

      Example:

      5 years 7 months
      → 6 years

      5 years 4 months
      → 5 years
    */


    const completedYears =
      months > 6
        ? Math.floor(years) + 1
        : Math.floor(years);


    const gratuity =
      (
        lastDrawnSalary *
        15 *
        completedYears
      ) / 26;


    const fifteenDaysWages =
      (
        lastDrawnSalary * 15
      ) / 26;


    return {

      lastDrawnSalary,

      completedYears,

      fifteenDaysWages,

      gratuity,

    };

  }, [
    basicSalary,
    da,
    yearsOfService,
    monthsOfService,
  ]);


  const resetCalculator = () => {

    setBasicSalary("");

    setDa("");

    setYearsOfService("");

    setMonthsOfService("0");

  };


  return (

    <CalculatorContainer>


      {/* BASIC SALARY */}

      <div className="input-group">

        <label>
          Basic Salary (Monthly)
        </label>

        <input
          type="number"
          min="0"
          value={basicSalary}
          placeholder="e.g. 50000"
          onChange={(event) =>
            setBasicSalary(
              event.target.value
            )
          }
        />

      </div>


      {/* DA */}

      <div className="input-group">

        <label>
          Dearness Allowance (Monthly)
        </label>

        <input
          type="number"
          min="0"
          value={da}
          placeholder="e.g. 5000"
          onChange={(event) =>
            setDa(
              event.target.value
            )
          }
        />

      </div>


      {/* YEARS */}

      <div className="input-group">

        <label>
          Completed Years of Service
        </label>

        <input
          type="number"
          min="0"
          value={yearsOfService}
          placeholder="e.g. 10"
          onChange={(event) =>
            setYearsOfService(
              event.target.value
            )
          }
        />

      </div>


      {/* MONTHS */}

      <div className="input-group">

        <label>
          Additional Months
        </label>

        <select
          value={monthsOfService}
          onChange={(event) =>
            setMonthsOfService(
              event.target.value
            )
          }
        >

          <option value="0">
            0 Months
          </option>

          <option value="1">
            1 Month
          </option>

          <option value="2">
            2 Months
          </option>

          <option value="3">
            3 Months
          </option>

          <option value="4">
            4 Months
          </option>

          <option value="5">
            5 Months
          </option>

          <option value="6">
            6 Months
          </option>

          <option value="7">
            7 Months
          </option>

          <option value="8">
            8 Months
          </option>

          <option value="9">
            9 Months
          </option>

          <option value="10">
            10 Months
          </option>

          <option value="11">
            11 Months
          </option>

        </select>

      </div>


      {/* RESULTS */}

      <ResultGrid>


        <ResultBox
          label="Last Drawn Salary"
          value={
            result
              ? `₹${result.lastDrawnSalary.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Service Used"
          value={
            result
              ? `${result.completedYears} years`
              : "—"
          }
        />


        <ResultBox
          label="15 Days' Wages"
          value={
            result
              ? `₹${result.fifteenDaysWages.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Estimated Gratuity"
          value={
            result
              ? `₹${result.gratuity.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


      </ResultGrid>


      {/* EXPLANATION */}

      <div className="calculator-note">

        <strong>
          How gratuity is estimated
        </strong>

        <p>
          The calculation uses the applicable
          last drawn salary, commonly Basic
          Salary plus Dearness Allowance.
        </p>

        <p>
          A commonly used formula is:
        </p>

        <p>
          <strong>
            Gratuity =
            Salary × 15 × Completed Years
            ÷ 26
          </strong>
        </p>

        <p>
          For the commonly used service-year
          calculation, an additional service
          period above six months may be treated
          as another completed year.
        </p>

        <p>
          Actual eligibility, calculation and
          tax treatment depend on applicable
          laws and individual employment
          circumstances.
        </p>

      </div>


      {/* RESET */}

      <ResetButton
        onReset={resetCalculator}
      />


    </CalculatorContainer>

  );

}