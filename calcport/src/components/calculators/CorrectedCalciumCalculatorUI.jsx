import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function CorrectedCalciumCalculatorUI() {

  const [calcium, setCalcium] =
    useState("");

  const [albumin, setAlbumin] =
    useState("");


  const result = useMemo(() => {

    if (
      calcium === "" ||
      albumin === ""
    ) {
      return null;
    }

    const ca =
      Number(calcium);

    const alb =
      Number(albumin);

    if (
      !Number.isFinite(ca) ||
      !Number.isFinite(alb) ||
      ca <= 0 ||
      alb <= 0
    ) {
      return null;
    }


    // Corrected Calcium
    // mg/dL formula
    const correctedCalcium =
      ca +
      0.8 * (4 - alb);


    return correctedCalcium;

  }, [
    calcium,
    albumin,
  ]);


  const resetCalculator = () => {

    setCalcium("");

    setAlbumin("");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          Total Calcium (mg/dL)
        </label>

        <input
          type="number"
          step="0.1"
          value={calcium}
          placeholder="e.g. 8.5"
          onChange={(event) =>
            setCalcium(
              event.target.value
            )
          }
        />

      </div>


      <div className="input-group">

        <label>
          Albumin (g/dL)
        </label>

        <input
          type="number"
          step="0.1"
          value={albumin}
          placeholder="e.g. 3.5"
          onChange={(event) =>
            setAlbumin(
              event.target.value
            )
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Corrected Calcium"
          value={
            result !== null
              ? `${result.toFixed(
                  2
                )} mg/dL`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        This is an educational estimate.
        Calcium results should be interpreted
        in clinical context.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}