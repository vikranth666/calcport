import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


const conversionTypes = {

  weight: {
    label: "Weight",
    units: ["kg", "lb"],
  },

  length: {
    label: "Length",
    units: ["cm", "inch"],
  },

  volume: {
    label: "Volume",
    units: ["mL", "L"],
  },

  mass: {
    label: "Mass",
    units: ["mcg", "mg", "g"],
  },

  temperature: {
    label: "Temperature",
    units: ["°C", "°F"],
  },

  glucose: {
    label: "Blood Glucose",
    units: ["mg/dL", "mmol/L"],
  },

  cholesterol: {
    label: "Cholesterol",
    units: ["mg/dL", "mmol/L"],
  },

  creatinine: {
    label: "Creatinine",
    units: ["mg/dL", "µmol/L"],
  },

  hemoglobin: {
    label: "Hemoglobin",
    units: ["g/dL", "g/L"],
  },

};


export default function MedicalUnitConverterUI() {

  const [category, setCategory] =
    useState("weight");

  const [value, setValue] =
    useState("");

  const [from, setFrom] =
    useState("kg");

  const [to, setTo] =
    useState("lb");


  const handleCategoryChange = (
    newCategory
  ) => {

    const units =
      conversionTypes[newCategory].units;

    setCategory(newCategory);

    setFrom(units[0]);

    setTo(
      units.length > 1
        ? units[1]
        : units[0]
    );

    setValue("");

  };


  const result = useMemo(() => {

    if (value === "") {
      return null;
    }

    const number =
      Number(value);

    if (
      !Number.isFinite(number)
    ) {
      return null;
    }


    if (from === to) {
      return number;
    }


    // WEIGHT

    if (category === "weight") {

      if (
        from === "kg" &&
        to === "lb"
      ) {
        return number * 2.20462;
      }

      if (
        from === "lb" &&
        to === "kg"
      ) {
        return number / 2.20462;
      }

    }


    // LENGTH

    if (category === "length") {

      if (
        from === "cm" &&
        to === "inch"
      ) {
        return number / 2.54;
      }

      if (
        from === "inch" &&
        to === "cm"
      ) {
        return number * 2.54;
      }

    }


    // VOLUME

    if (category === "volume") {

      if (
        from === "mL" &&
        to === "L"
      ) {
        return number / 1000;
      }

      if (
        from === "L" &&
        to === "mL"
      ) {
        return number * 1000;
      }

    }


    // MASS

    if (category === "mass") {

      const valuesInMg = {

        mcg: number / 1000,

        mg: number,

        g: number * 1000,

      };

      const mgValue =
        valuesInMg[from];

      if (to === "mcg") {
        return mgValue * 1000;
      }

      if (to === "mg") {
        return mgValue;
      }

      if (to === "g") {
        return mgValue / 1000;
      }

    }


    // TEMPERATURE

    if (category === "temperature") {

      if (
        from === "°C" &&
        to === "°F"
      ) {
        return (
          number * 9 / 5
        ) + 32;
      }

      if (
        from === "°F" &&
        to === "°C"
      ) {
        return (
          number - 32
        ) * 5 / 9;
      }

    }


    // BLOOD GLUCOSE

    if (category === "glucose") {

      if (
        from === "mg/dL" &&
        to === "mmol/L"
      ) {
        return number / 18;
      }

      if (
        from === "mmol/L" &&
        to === "mg/dL"
      ) {
        return number * 18;
      }

    }


    // CHOLESTEROL

    if (category === "cholesterol") {

      if (
        from === "mg/dL" &&
        to === "mmol/L"
      ) {
        return number / 38.67;
      }

      if (
        from === "mmol/L" &&
        to === "mg/dL"
      ) {
        return number * 38.67;
      }

    }


    // CREATININE

    if (category === "creatinine") {

      if (
        from === "mg/dL" &&
        to === "µmol/L"
      ) {
        return number * 88.4;
      }

      if (
        from === "µmol/L" &&
        to === "mg/dL"
      ) {
        return number / 88.4;
      }

    }


    // HEMOGLOBIN

    if (category === "hemoglobin") {

      if (
        from === "g/dL" &&
        to === "g/L"
      ) {
        return number * 10;
      }

      if (
        from === "g/L" &&
        to === "g/dL"
      ) {
        return number / 10;
      }

    }


    return null;

  }, [
    category,
    value,
    from,
    to,
  ]);


  const swapUnits = () => {

    setFrom(to);

    setTo(from);

  };


  const resetCalculator = () => {

    setCategory("weight");

    setValue("");

    setFrom("kg");

    setTo("lb");

  };


  return (

    <CalculatorContainer>


      {/* CONVERSION TYPE */}

      <div className="input-group">

        <label>
          Conversion Type
        </label>

        <select
          value={category}
          onChange={(event) =>
            handleCategoryChange(
              event.target.value
            )
          }
        >

          {Object.entries(
            conversionTypes
          ).map(([key, item]) => (

            <option
              key={key}
              value={key}
            >
              {item.label}
            </option>

          ))}

        </select>

      </div>


      {/* VALUE */}

      <div className="input-group">

        <label>
          Value
        </label>

        <input
          type="number"
          value={value}
          placeholder="Enter value"
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
        />

      </div>


      {/* FROM */}

      <div className="input-group">

        <label>
          From
        </label>

        <select
          value={from}
          onChange={(event) =>
            setFrom(
              event.target.value
            )
          }
        >

          {conversionTypes[
            category
          ].units.map((unit) => (

            <option
              key={unit}
              value={unit}
            >
              {unit}
            </option>

          ))}

        </select>

      </div>


      {/* TO */}

      <div className="input-group">

        <label>
          To
        </label>

        <select
          value={to}
          onChange={(event) =>
            setTo(
              event.target.value
            )
          }
        >

          {conversionTypes[
            category
          ].units.map((unit) => (

            <option
              key={unit}
              value={unit}
            >
              {unit}
            </option>

          ))}

        </select>

      </div>


      {/* SWAP */}

      <button
        type="button"
        className="swap-button"
        onClick={swapUnits}
      >

        ⇅ Swap Units

      </button>


      {/* RESULT */}

      <ResultGrid>

        <ResultBox
          label="Converted Value"
          value={
            result !== null
              ? `${result.toFixed(4)} ${to}`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">

        Medical unit conversions are
        mathematical conversions only.
        Always interpret clinical values
        in appropriate medical context.

      </p>


      <ResetButton
        onReset={resetCalculator}
      />


    </CalculatorContainer>

  );

}