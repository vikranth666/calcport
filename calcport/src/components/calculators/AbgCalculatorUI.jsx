import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function AbgCalculatorUI() {

  const [ph, setPh] =
    useState("");

  const [paco2, setPaco2] =
    useState("");

  const [hco3, setHco3] =
    useState("");

  const [anionGap, setAnionGap] =
    useState("");


  const result = useMemo(() => {

    if (
      ph === "" ||
      paco2 === "" ||
      hco3 === ""
    ) {
      return null;
    }


    const pHValue =
      Number(ph);

    const paCO2Value =
      Number(paco2);

    const hco3Value =
      Number(hco3);


    if (
      !Number.isFinite(pHValue) ||
      !Number.isFinite(paCO2Value) ||
      !Number.isFinite(hco3Value)
    ) {
      return null;
    }


    if (
      pHValue <= 0 ||
      paCO2Value <= 0 ||
      hco3Value <= 0
    ) {
      return null;
    }


    let acidBaseStatus =
      "Near reference pH";


    if (pHValue < 7.35) {
      acidBaseStatus =
        "Acidemia";
    }

    else if (pHValue > 7.45) {
      acidBaseStatus =
        "Alkalemia";
    }


    let primaryProcess =
      "No clear primary disturbance";


    /*
      Basic educational interpretation.

      Low pH + high PaCO2
      = respiratory acidosis pattern

      Low pH + low HCO3
      = metabolic acidosis pattern

      High pH + low PaCO2
      = respiratory alkalosis pattern

      High pH + high HCO3
      = metabolic alkalosis pattern
    */


    if (pHValue < 7.35) {

      if (
        paCO2Value > 45 &&
        hco3Value >= 22
      ) {
        primaryProcess =
          "Respiratory acidosis pattern";
      }

      else if (
        hco3Value < 24 &&
        paCO2Value <= 45
      ) {
        primaryProcess =
          "Metabolic acidosis pattern";
      }

      else if (
        paCO2Value > 45 &&
        hco3Value < 24
      ) {
        primaryProcess =
          "Mixed respiratory and metabolic acidosis pattern";
      }

    }


    else if (pHValue > 7.45) {

      if (
        paCO2Value < 35 &&
        hco3Value <= 26
      ) {
        primaryProcess =
          "Respiratory alkalosis pattern";
      }

      else if (
        hco3Value > 24 &&
        paCO2Value >= 35
      ) {
        primaryProcess =
          "Metabolic alkalosis pattern";
      }

      else if (
        paCO2Value < 35 &&
        hco3Value > 26
      ) {
        primaryProcess =
          "Mixed respiratory and metabolic alkalosis pattern";
      }

    }


    /*
      Winter's Formula

      Expected PaCO2 =
      (1.5 × HCO3) + 8 ± 2
    */


    let compensation =
      "Compensation estimate not applicable";


    if (
      pHValue < 7.35 &&
      hco3Value < 24
    ) {

      const expectedPaco2 =
        (1.5 * hco3Value) + 8;

      const lower =
        expectedPaco2 - 2;

      const upper =
        expectedPaco2 + 2;


      if (
        paCO2Value >= lower &&
        paCO2Value <= upper
      ) {

        compensation =
          `Expected PaCO₂ approximately ${expectedPaco2.toFixed(
            1
          )} mmHg (${lower.toFixed(
            1
          )}–${upper.toFixed(
            1
          )})`;

      }

      else if (
        paCO2Value > upper
      ) {

        compensation =
          `PaCO₂ is above the expected range (${lower.toFixed(
            1
          )}–${upper.toFixed(
            1
          )} mmHg)`;

      }

      else {

        compensation =
          `PaCO₂ is below the expected range (${lower.toFixed(
            1
          )}–${upper.toFixed(
            1
          )} mmHg)`;

      }

    }


    /*
      Optional Anion Gap

      AG = Na - (Cl + HCO3)

      Since this calculator does not
      request chloride and sodium,
      we only display the supplied AG.
    */


    let agResult = null;


    if (anionGap !== "") {

      const ag =
        Number(anionGap);

      if (
        Number.isFinite(ag) &&
        ag >= 0
      ) {
        agResult = ag;
      }

    }


    return {

      acidBaseStatus,

      primaryProcess,

      compensation,

      anionGap: agResult,

    };

  }, [
    ph,
    paco2,
    hco3,
    anionGap,
  ]);


  const resetCalculator = () => {

    setPh("");

    setPaco2("");

    setHco3("");

    setAnionGap("");

  };


  return (

    <CalculatorContainer>


      {/* pH */}

      <div className="input-group">

        <label>
          pH
        </label>

        <input
          type="number"
          step="0.01"
          value={ph}
          placeholder="e.g. 7.40"
          onChange={(event) =>
            setPh(event.target.value)
          }
        />

      </div>


      {/* PaCO2 */}

      <div className="input-group">

        <label>
          PaCO₂ (mmHg)
        </label>

        <input
          type="number"
          step="0.1"
          value={paco2}
          placeholder="e.g. 40"
          onChange={(event) =>
            setPaco2(event.target.value)
          }
        />

      </div>


      {/* HCO3 */}

      <div className="input-group">

        <label>
          HCO₃⁻ (mEq/L)
        </label>

        <input
          type="number"
          step="0.1"
          value={hco3}
          placeholder="e.g. 24"
          onChange={(event) =>
            setHco3(event.target.value)
          }
        />

      </div>


      {/* OPTIONAL AG */}

      <div className="input-group">

        <label>
          Anion Gap (optional)
        </label>

        <input
          type="number"
          step="0.1"
          value={anionGap}
          placeholder="e.g. 12"
          onChange={(event) =>
            setAnionGap(event.target.value)
          }
        />

      </div>


      {/* RESULTS */}

      <ResultGrid>

        <ResultBox
          label="Acid-Base Status"
          value={
            result
              ? result.acidBaseStatus
              : "—"
          }
        />


        <ResultBox
          label="Primary Pattern"
          value={
            result
              ? result.primaryProcess
              : "—"
          }
        />


        <ResultBox
          label="Compensation"
          value={
            result
              ? result.compensation
              : "—"
          }
        />


        {result?.anionGap !== null &&
          result?.anionGap !== undefined && (

          <ResultBox
            label="Supplied Anion Gap"
            value={
              `${result.anionGap.toFixed(
                1
              )} mEq/L`
            }
          />

        )}

      </ResultGrid>


      {/* EDUCATIONAL EXPLANATION */}

      <div className="calculator-note">

        <strong>
          How to read the result
        </strong>

        <p>
          pH below 7.35 indicates acidemia,
          while pH above 7.45 indicates
          alkalemia.
        </p>

        <p>
          PaCO₂ primarily reflects the
          respiratory component, while
          HCO₃⁻ primarily reflects the
          metabolic component.
        </p>

        <p>
          In metabolic acidosis, Winter's
          formula estimates the expected
          PaCO₂:
        </p>

        <p>
          <strong>
            Expected PaCO₂ =
            (1.5 × HCO₃⁻) + 8 ± 2
          </strong>
        </p>

        <p>
          These calculations are educational
          estimates and should not be used
          alone to diagnose or treat a patient.
        </p>

      </div>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}