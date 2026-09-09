import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function SerumOsmolalityCalculatorUI() {

  const [sodium, setSodium] =
    useState("");

  const [glucose, setGlucose] =
    useState("");

  const [bun, setBun] =
    useState("");


  const result = useMemo(() => {

    if (
      sodium === "" ||
      glucose === "" ||
      bun === ""
    ) {
      return null;
    }

    const na =
      Number(sodium);

    const glu =
      Number(glucose);

    const bunValue =
      Number(bun);


    if (
      !Number.isFinite(na) ||
      !Number.isFinite(glu) ||
      !Number.isFinite(bunValue)
    ) {
      return null;
    }


    const osmolality =
      (2 * na) +
      (glu / 18) +
      (bunValue / 2.8);


    return osmolality;

  }, [
    sodium,
    glucose,
    bun,
  ]);


  const resetCalculator = () => {

    setSodium("");

    setGlucose("");

    setBun("");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          Sodium (mEq/L)
        </label>

        <input
          type="number"
          value={sodium}
          placeholder="e.g. 140"
          onChange={(event) =>
            setSodium(
              event.target.value
            )
          }
        />

      </div>


      <div className="input-group">

        <label>
          Glucose (mg/dL)
        </label>

        <input
          type="number"
          value={glucose}
          placeholder="e.g. 90"
          onChange={(event) =>
            setGlucose(
              event.target.value
            )
          }
        />

      </div>


      <div className="input-group">

        <label>
          BUN (mg/dL)
        </label>

        <input
          type="number"
          value={bun}
          placeholder="e.g. 15"
          onChange={(event) =>
            setBun(
              event.target.value
            )
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Estimated Serum Osmolality"
          value={
            result !== null
              ? `${result.toFixed(
                  1
                )} mOsm/kg`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        Calculated osmolality is an estimate
        and may differ from laboratory-measured
        osmolality.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}