import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function AnionGapCalculatorUI() {

  const [sodium, setSodium] =
    useState("");

  const [chloride, setChloride] =
    useState("");

  const [bicarbonate, setBicarbonate] =
    useState("");


  const result = useMemo(() => {

    if (
      sodium === "" ||
      chloride === "" ||
      bicarbonate === ""
    ) {
      return null;
    }

    const na = Number(sodium);
    const cl = Number(chloride);
    const hco3 = Number(bicarbonate);

    if (
      !Number.isFinite(na) ||
      !Number.isFinite(cl) ||
      !Number.isFinite(hco3)
    ) {
      return null;
    }

    return na - (cl + hco3);

  }, [
    sodium,
    chloride,
    bicarbonate,
  ]);


  const resetCalculator = () => {

    setSodium("");
    setChloride("");
    setBicarbonate("");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          Sodium (Na⁺)
        </label>

        <input
          type="number"
          value={sodium}
          placeholder="e.g. 140"
          onChange={(event) =>
            setSodium(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Chloride (Cl⁻)
        </label>

        <input
          type="number"
          value={chloride}
          placeholder="e.g. 104"
          onChange={(event) =>
            setChloride(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Bicarbonate (HCO₃⁻)
        </label>

        <input
          type="number"
          value={bicarbonate}
          placeholder="e.g. 24"
          onChange={(event) =>
            setBicarbonate(event.target.value)
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Anion Gap"
          value={
            result !== null
              ? `${result.toFixed(1)} mEq/L`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        Educational calculation only.
        Results should be interpreted in
        clinical context.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}