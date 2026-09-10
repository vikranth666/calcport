import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function PfCalculatorUI() {

  const [basicSalary, setBasicSalary] =
    useState("");

  const [da, setDa] =
    useState("");

  const [employeeRate, setEmployeeRate] =
    useState("12");

  const [employerRate, setEmployerRate] =
    useState("12");

  const [interestRate, setInterestRate] =
    useState("8.25");

  const [years, setYears] =
    useState("10");


  const result = useMemo(() => {

    if (
      basicSalary === "" ||
      da === "" ||
      years === ""
    ) {
      return null;
    }


    const basic =
      Number(basicSalary);

    const daAmount =
      Number(da);

    const employeeContributionRate =
      Number(employeeRate);

    const employerContributionRate =
      Number(employerRate);

    const annualInterestRate =
      Number(interestRate);

    const investmentYears =
      Number(years);


    if (
      !Number.isFinite(basic) ||
      !Number.isFinite(daAmount) ||
      !Number.isFinite(
        employeeContributionRate
      ) ||
      !Number.isFinite(
        employerContributionRate
      ) ||
      !Number.isFinite(
        annualInterestRate
      ) ||
      !Number.isFinite(
        investmentYears
      ) ||
      basic < 0 ||
      daAmount < 0 ||
      investmentYears <= 0
    ) {
      return null;
    }


    /*
      Eligible Salary
      = Basic Salary + DA
    */

    const eligibleSalary =
      basic + daAmount;


    /*
      Monthly Contributions
    */

    const employeeContribution =
      eligibleSalary *
      employeeContributionRate /
      100;


    const employerContribution =
      eligibleSalary *
      employerContributionRate /
      100;


    const totalMonthlyContribution =
      employeeContribution +
      employerContribution;


    /*
      Future Value

      Monthly contribution
      compounded monthly
      using estimated interest rate
    */

    const monthlyRate =
      annualInterestRate /
      100 /
      12;


    const totalMonths =
      investmentYears * 12;


    const futureValue =
  monthlyRate > 0
    ? totalMonthlyContribution *
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
    : totalMonthlyContribution *
      totalMonths;


    const totalContribution =
      totalMonthlyContribution *
      totalMonths;


    const estimatedInterest =
      futureValue -
      totalContribution;


    return {

      eligibleSalary,

      employeeContribution,

      employerContribution,

      totalMonthlyContribution,

      totalContribution,

      estimatedInterest,

      futureValue,

    };

  }, [
    basicSalary,
    da,
    employeeRate,
    employerRate,
    interestRate,
    years,
  ]);


  const resetCalculator = () => {

    setBasicSalary("");

    setDa("");

    setEmployeeRate("12");

    setEmployerRate("12");

    setInterestRate("8.25");

    setYears("10");

  };


  return (

    <CalculatorContainer>


      {/* BASIC SALARY */}

      <div className="input-group">

        <label>
          Monthly Basic Salary
        </label>

        <input
          type="number"
          value={basicSalary}
          placeholder="e.g. 30000"
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
          Monthly Dearness Allowance
        </label>

        <input
          type="number"
          value={da}
          placeholder="e.g. 5000"
          onChange={(event) =>
            setDa(
              event.target.value
            )
          }
        />

      </div>


      {/* EMPLOYEE RATE */}

      <div className="input-group">

        <label>
          Employee Contribution (%)
        </label>

        <input
          type="number"
          value={employeeRate}
          onChange={(event) =>
            setEmployeeRate(
              event.target.value
            )
          }
        />

      </div>


      {/* EMPLOYER RATE */}

      <div className="input-group">

        <label>
          Employer Contribution (%)
        </label>

        <input
          type="number"
          value={employerRate}
          onChange={(event) =>
            setEmployerRate(
              event.target.value
            )
          }
        />

      </div>


      {/* INTEREST RATE */}

      <div className="input-group">

        <label>
          Estimated Annual Interest (%)
        </label>

        <input
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(event) =>
            setInterestRate(
              event.target.value
            )
          }
        />

      </div>


      {/* YEARS */}

      <div className="input-group">

        <label>
          Investment Period (Years)
        </label>

        <input
          type="number"
          value={years}
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
          label="Eligible Monthly Salary"
          value={
            result
              ? `₹${result.eligibleSalary.toLocaleString(
                  "en-IN"
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Employee Monthly Contribution"
          value={
            result
              ? `₹${result.employeeContribution.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Employer Monthly Contribution"
          value={
            result
              ? `₹${result.employerContribution.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Total Monthly Contribution"
          value={
            result
              ? `₹${result.totalMonthlyContribution.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Total Contributions"
          value={
            result
              ? `₹${result.totalContribution.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Estimated Interest Earned"
          value={
            result
              ? `₹${result.estimatedInterest.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Estimated PF Balance"
          value={
            result
              ? `₹${result.futureValue.toLocaleString(
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
          How this PF Calculator works
        </strong>

        <p>
          Eligible monthly salary is calculated
          using Basic Salary and Dearness
          Allowance.
        </p>

        <p>
          Employee and employer contributions
          are estimated using the contribution
          percentages entered above.
        </p>

        <p>
          Future PF balance is estimated using
          regular monthly contributions and the
          annual interest rate entered.
        </p>

        <p>
          Actual EPF calculations may differ
          because employer contributions can
          have different allocations under
          applicable EPF rules.
        </p>

      </div>


      {/* RESET */}

      <ResetButton
        onReset={resetCalculator}
      />


    </CalculatorContainer>

  );

}