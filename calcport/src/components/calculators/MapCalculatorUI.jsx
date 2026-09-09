import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function MapCalculatorUI() {

  const [systolic, setSystolic] =
    useState("");

  const [diastolic, setDiastolic] =
    useState("");


  const result = useMemo(() => {

    if (
      systolic === "" ||
      diastolic === ""
    ) {
      return null;
    }

    const sbp = Number(systolic);
    const dbp = Number(diastolic);

    if (
      !Number.isFinite(sbp) ||
      !Number.isFinite(dbp) ||
      sbp <= 0 ||
      dbp <= 0 ||
      sbp < dbp
    ) {
      return null;
    }

    return (
      dbp +
      (sbp - dbp) / 3
    );

  }, [
    systolic,
    diastolic,
  ]);


  const resetCalculator = () => {

    setSystolic("");
    setDiastolic("");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          Systolic Blood Pressure (mmHg)
        </label>

        <input
          type="number"
          value={systolic}
          placeholder="e.g. 120"
          onChange={(event) =>
            setSystolic(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Diastolic Blood Pressure (mmHg)
        </label>

        <input
          type="number"
          value={diastolic}
          placeholder="e.g. 80"
          onChange={(event) =>
            setDiastolic(event.target.value)
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Estimated MAP"
          value={
            result
              ? `${Math.round(result)} mmHg`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        Educational estimate only. This tool
        should not replace clinical assessment.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}