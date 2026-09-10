import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function HraCalculatorUI() {

  const [basicSalary, setBasicSalary] =
    useState("");

  const [hraReceived, setHraReceived] =
    useState("");

  const [rentPaid, setRentPaid] =
    useState("");

  const [cityType, setCityType] =
    useState("non-metro");


  const result = useMemo(() => {

    if (
      basicSalary === "" ||
      hraReceived === "" ||
      rentPaid === ""
    ) {
      return null;
    }


    const basic =
      Number(basicSalary);

    const hra =
      Number(hraReceived);

    const rent =
      Number(rentPaid);


    if (
      !Number.isFinite(basic) ||
      !Number.isFinite(hra) ||
      !Number.isFinite(rent) ||
      basic < 0 ||
      hra < 0 ||
      rent < 0
    ) {
      return null;
    }


    /*
      HRA Exemption is the lowest of:

      1. Actual HRA received

      2. 50% of salary for metro
         OR
         40% for non-metro

      3. Rent paid - 10% of salary
    */


    const salaryPercentage =
      cityType === "metro"
        ? basic * 0.5
        : basic * 0.4;


    const rentMinusSalary =
      Math.max(
        rent - basic * 0.1,
        0
      );


    const hraExemption =
      Math.min(
        hra,
        salaryPercentage,
        rentMinusSalary
      );


    const taxableHra =
      Math.max(
        hra - hraExemption,
        0
      );


    return {

      hraExemption,

      taxableHra,

      actualHra: hra,

      salaryPercentage,

      rentMinusSalary,

    };

  }, [
    basicSalary,
    hraReceived,
    rentPaid,
    cityType,
  ]);


  const resetCalculator = () => {

    setBasicSalary("");

    setHraReceived("");

    setRentPaid("");

    setCityType(
      "non-metro"
    );

  };


  return (

    <CalculatorContainer>


      {/* BASIC SALARY */}

      <div className="input-group">

        <label>
          Basic Salary (Yearly)
        </label>

        <input
          type="number"
          value={basicSalary}
          placeholder="e.g. 600000"
          onChange={(event) =>
            setBasicSalary(
              event.target.value
            )
          }
        />

      </div>


      {/* HRA RECEIVED */}

      <div className="input-group">

        <label>
          HRA Received (Yearly)
        </label>

        <input
          type="number"
          value={hraReceived}
          placeholder="e.g. 240000"
          onChange={(event) =>
            setHraReceived(
              event.target.value
            )
          }
        />

      </div>


      {/* RENT PAID */}

      <div className="input-group">

        <label>
          Rent Paid (Yearly)
        </label>

        <input
          type="number"
          value={rentPaid}
          placeholder="e.g. 300000"
          onChange={(event) =>
            setRentPaid(
              event.target.value
            )
          }
        />

      </div>


      {/* CITY TYPE */}

      <div className="input-group">

        <label>
          City Type
        </label>

        <select
          value={cityType}
          onChange={(event) =>
            setCityType(
              event.target.value
            )
          }
        >

          <option value="metro">
            Metro City
          </option>

          <option value="non-metro">
            Non-Metro City
          </option>

        </select>

      </div>


      {/* RESULTS */}

      <ResultGrid>


        <ResultBox
          label="Estimated HRA Exemption"
          value={
            result
              ? `₹${result.hraExemption.toLocaleString(
                  "en-IN"
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Taxable HRA"
          value={
            result
              ? `₹${result.taxableHra.toLocaleString(
                  "en-IN"
                )}`
              : "—"
          }
        />


        <ResultBox
          label={
            cityType === "metro"
              ? "50% of Basic Salary"
              : "40% of Basic Salary"
          }
          value={
            result
              ? `₹${result.salaryPercentage.toLocaleString(
                  "en-IN"
                )}`
              : "—"
          }
        />


        <ResultBox
          label="Rent Paid − 10% of Salary"
          value={
            result
              ? `₹${result.rentMinusSalary.toLocaleString(
                  "en-IN"
                )}`
              : "—"
          }
        />


      </ResultGrid>


      {/* EXPLANATION */}

      <div className="calculator-note">

        <strong>
          How HRA exemption is estimated
        </strong>

        <p>
          The estimated HRA exemption is
          calculated as the lowest of the
          following amounts:
        </p>

        <p>
          1. Actual HRA received
        </p>

        <p>
          2. 50% of basic salary for metro
          cities or 40% for non-metro cities
        </p>

        <p>
          3. Rent paid minus 10% of basic
          salary
        </p>

        <p>
          Tax rules and eligibility may
          change. This calculator provides
          an estimate only.
        </p>

      </div>


      {/* RESET */}

      <ResetButton
        onReset={resetCalculator}
      />


    </CalculatorContainer>

  );

}