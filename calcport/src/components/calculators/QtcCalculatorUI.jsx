import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function QtcCalculatorUI() {

  const [qt, setQt] =
    useState("");

  const [heartRate, setHeartRate] =
    useState("");


  const result = useMemo(() => {

    if (
      qt === "" ||
      heartRate === ""
    ) {
      return null;
    }

    const qtNumber =
      Number(qt);

    const hr =
      Number(heartRate);

    if (
      !Number.isFinite(qtNumber) ||
      !Number.isFinite(hr) ||
      qtNumber <= 0 ||
      hr <= 0
    ) {
      return null;
    }

    // Convert QT milliseconds to seconds
    const qtSeconds =
      qtNumber / 1000;

    // RR interval in seconds
    const rr =
      60 / hr;


    // Bazett Formula
    const bazett =
      qtSeconds /
      Math.sqrt(rr);


    // Fridericia Formula
    const fridericia =
      qtSeconds /
      Math.cbrt(rr);


    return {

      bazett:
        bazett * 1000,

      fridericia:
        fridericia * 1000,

    };

  }, [
    qt,
    heartRate,
  ]);


  const resetCalculator = () => {

    setQt("");

    setHeartRate("");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          QT Interval (ms)
        </label>

        <input
          type="number"
          value={qt}
          placeholder="e.g. 400"
          onChange={(event) =>
            setQt(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Heart Rate (bpm)
        </label>

        <input
          type="number"
          value={heartRate}
          placeholder="e.g. 75"
          onChange={(event) =>
            setHeartRate(event.target.value)
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="QTc (Bazett)"
          value={
            result
              ? `${Math.round(
                  result.bazett
                )} ms`
              : "—"
          }
        />


        <ResultBox
          label="QTc (Fridericia)"
          value={
            result
              ? `${Math.round(
                  result.fridericia
                )} ms`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        Educational calculation only.
        QTc values require clinical
        interpretation.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}