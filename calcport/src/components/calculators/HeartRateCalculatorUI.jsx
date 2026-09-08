import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function HeartRateCalculatorUI() {

  const [age, setAge] =
    useState("");


  const result = useMemo(() => {

    if (age === "") {
      return null;
    }

    const ageNumber =
      Number(age);

    if (
      !Number.isFinite(ageNumber) ||
      ageNumber <= 0 ||
      ageNumber > 120
    ) {
      return null;
    }

    const maxHeartRate =
      220 - ageNumber;

    const moderateMin =
      maxHeartRate * 0.5;

    const moderateMax =
      maxHeartRate * 0.7;

    const vigorousMin =
      maxHeartRate * 0.7;

    const vigorousMax =
      maxHeartRate * 0.85;

    return {
      maxHeartRate,
      moderateMin,
      moderateMax,
      vigorousMin,
      vigorousMax,
    };

  }, [age]);


  const resetCalculator = () => {
    setAge("");
  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          Age
        </label>

        <input
          type="number"
          value={age}
          placeholder="e.g. 30"
          min="1"
          max="120"
          onChange={(event) =>
            setAge(event.target.value)
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Estimated Maximum Heart Rate"
          value={
            result
              ? `${Math.round(
                  result.maxHeartRate
                )} bpm`
              : "—"
          }
        />


        <ResultBox
          label="Moderate Exercise Zone"
          value={
            result
              ? `${Math.round(
                  result.moderateMin
                )} - ${Math.round(
                  result.moderateMax
                )} bpm`
              : "—"
          }
        />


        <ResultBox
          label="Vigorous Exercise Zone"
          value={
            result
              ? `${Math.round(
                  result.vigorousMin
                )} - ${Math.round(
                  result.vigorousMax
                )} bpm`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        These values are general estimates and
        may not be appropriate for everyone.
        Consult a qualified healthcare professional
        before starting a new exercise program.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}