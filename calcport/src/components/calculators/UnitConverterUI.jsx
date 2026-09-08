import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


const conversionData = {

  Length: {
    units: {
      Meter: 1,
      Kilometer: 1000,
      Centimeter: 0.01,
      Millimeter: 0.001,
      Mile: 1609.344,
      Yard: 0.9144,
      Foot: 0.3048,
      Inch: 0.0254,
    },
  },

  Weight: {
    units: {
      Kilogram: 1,
      Gram: 0.001,
      Milligram: 0.000001,
      Tonne: 1000,
      Pound: 0.45359237,
      Ounce: 0.028349523125,
    },
  },

  Area: {
    units: {
      "Square Meter": 1,
      "Square Kilometer": 1000000,
      "Square Centimeter": 0.0001,
      "Square Foot": 0.09290304,
      "Square Yard": 0.83612736,
      "Square Inch": 0.00064516,
      "Acre": 4046.8564224,
      "Hectare": 10000,
    },
  },

  Volume: {
    units: {
      Liter: 1,
      Milliliter: 0.001,
      "Cubic Meter": 1000,
      "Cubic Centimeter": 0.001,
      "Cubic Foot": 28.316846592,
      Gallon: 3.785411784,
      Quart: 0.946352946,
      Pint: 0.473176473,
    },
  },

  Speed: {
    units: {
      "Meter/Second": 1,
      "Kilometer/Hour": 0.2777777778,
      "Mile/Hour": 0.44704,
      "Foot/Second": 0.3048,
      Knot: 0.5144444444,
    },
  },

  Time: {
    units: {
      Second: 1,
      Minute: 60,
      Hour: 3600,
      Day: 86400,
      Week: 604800,
      Month: 2629800,
      Year: 31557600,
    },
  },

  Data: {
    units: {
      Bit: 1,
      Byte: 8,
      Kilobyte: 8000,
      Megabyte: 8000000,
      Gigabyte: 8000000000,
      Terabyte: 8000000000000,
    },
  },

};


const temperatureUnits = [
  "Celsius",
  "Fahrenheit",
  "Kelvin",
];


export default function UnitConverterUI() {

  const [category, setCategory] =
    useState("Length");

  const [fromUnit, setFromUnit] =
    useState("Meter");

  const [toUnit, setToUnit] =
    useState("Kilometer");

  const [value, setValue] =
    useState("");


  const units =
    category === "Temperature"
      ? temperatureUnits
      : Object.keys(
          conversionData[category].units
        );


  const convertTemperature = (
    input,
    from,
    to
  ) => {

    let celsius;

    if (from === "Celsius") {
      celsius = input;
    } else if (from === "Fahrenheit") {
      celsius = (input - 32) * 5 / 9;
    } else {
      celsius = input - 273.15;
    }


    if (to === "Celsius") {
      return celsius;
    }

    if (to === "Fahrenheit") {
      return celsius * 9 / 5 + 32;
    }

    return celsius + 273.15;
  };


  const result = useMemo(() => {

    if (value === "") {
      return null;
    }


    const input = Number(value);


    if (!Number.isFinite(input)) {
      return null;
    }


    let converted;


    if (category === "Temperature") {

      converted =
        convertTemperature(
          input,
          fromUnit,
          toUnit
        );

    } else {

      const fromFactor =
        conversionData[
          category
        ].units[fromUnit];

      const toFactor =
        conversionData[
          category
        ].units[toUnit];


      const baseValue =
        input * fromFactor;

      converted =
        baseValue / toFactor;
    }


    return converted;

  }, [
    value,
    category,
    fromUnit,
    toUnit,
  ]);


  const formatNumber = (number) => {

    if (!Number.isFinite(number)) {
      return "—";
    }

    return number.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 10,
      }
    );
  };


  const handleCategoryChange = (
    event
  ) => {

    const newCategory =
      event.target.value;

    setCategory(newCategory);


    if (newCategory === "Temperature") {

      setFromUnit("Celsius");
      setToUnit("Fahrenheit");

    } else {

      const newUnits =
        Object.keys(
          conversionData[
            newCategory
          ].units
        );

      setFromUnit(newUnits[0]);
      setToUnit(
        newUnits[1] || newUnits[0]
      );
    }
  };


  const resetCalculator = () => {

    setCategory("Length");
    setFromUnit("Meter");
    setToUnit("Kilometer");
    setValue("");
  };


  return (
    <CalculatorContainer>

      <div className="input-group">

        <label htmlFor="unit-category">
          Conversion Type
        </label>

        <select
          id="unit-category"
          value={category}
          onChange={handleCategoryChange}
        >

          <option value="Length">
            Length
          </option>

          <option value="Weight">
            Weight
          </option>

          <option value="Temperature">
            Temperature
          </option>

          <option value="Area">
            Area
          </option>

          <option value="Volume">
            Volume
          </option>

          <option value="Speed">
            Speed
          </option>

          <option value="Time">
            Time
          </option>

          <option value="Data">
            Data
          </option>

        </select>

      </div>


      <div className="input-group">

        <label htmlFor="unit-value">
          Value
        </label>

        <input
          id="unit-value"
          type="number"
          step="any"
          value={value}
          placeholder="e.g. 10"
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
        />

      </div>


      <div className="input-group">

        <label htmlFor="from-unit">
          From
        </label>

        <select
          id="from-unit"
          value={fromUnit}
          onChange={(event) =>
            setFromUnit(
              event.target.value
            )
          }
        >

          {units.map((unit) => (
            <option
              key={unit}
              value={unit}
            >
              {unit}
            </option>
          ))}

        </select>

      </div>


      <div className="input-group">

        <label htmlFor="to-unit">
          To
        </label>

        <select
          id="to-unit"
          value={toUnit}
          onChange={(event) =>
            setToUnit(
              event.target.value
            )
          }
        >

          {units.map((unit) => (
            <option
              key={unit}
              value={unit}
            >
              {unit}
            </option>
          ))}

        </select>

      </div>


      <ResultGrid>

        <ResultBox
          label={`Converted Value (${toUnit})`}
          value={
            result !== null
              ? formatNumber(result)
              : "—"
          }
          copyValue={
            result !== null
              ? String(result)
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