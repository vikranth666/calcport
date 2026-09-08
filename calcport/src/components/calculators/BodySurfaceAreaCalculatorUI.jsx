import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function BodySurfaceAreaCalculatorUI() {

  const [height, setHeight] =
    useState("");

  const [weight, setWeight] =
    useState("");


  const result = useMemo(() => {

    if (
      height === "" ||
      weight === ""
    ) {
      return null;
    }

    const heightNumber =
      Number(height);

    const weightNumber =
      Number(weight);


    if (
      !Number.isFinite(heightNumber) ||
      !Number.isFinite(weightNumber) ||
      heightNumber <= 0 ||
      weightNumber <= 0
    ) {
      return null;
    }


    const bsa =
      Math.sqrt(
        (heightNumber * weightNumber) /
        3600
      );


    return bsa;

  }, [
    height,
    weight,
  ]);


  const resetCalculator = () => {

    setHeight("");
    setWeight("");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          Height (cm)
        </label>

        <input
          type="number"
          value={height}
          placeholder="e.g. 175"
          min="1"
          onChange={(event) =>
            setHeight(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Weight (kg)
        </label>

        <input
          type="number"
          value={weight}
          placeholder="e.g. 70"
          min="1"
          onChange={(event) =>
            setWeight(event.target.value)
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Body Surface Area"
          value={
            result
              ? `${result.toFixed(2)} m²`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        This result is an estimate using the
        Mosteller formula and should not be used
        alone for medical decisions.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}