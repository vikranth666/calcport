import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function PregnancyWeekCalculatorUI() {

  const [lmp, setLmp] =
    useState("");


  const result = useMemo(() => {

    if (!lmp) {
      return null;
    }

    const startDate =
      new Date(`${lmp}T00:00:00`);

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    if (
      startDate > today
    ) {
      return null;
    }

    const difference =
      today - startDate;

    const totalDays =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

    const weeks =
      Math.floor(
        totalDays / 7
      );

    const days =
      totalDays % 7;

    return {
      weeks,
      days,
    };

  }, [lmp]);


  const resetCalculator = () => {
    setLmp("");
  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          First Day of Last Menstrual Period
        </label>

        <input
          type="date"
          value={lmp}
          onChange={(event) =>
            setLmp(event.target.value)
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Current Pregnancy"
          value={
            result
              ? `${result.weeks} weeks ${result.days} days`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        This calculation is an estimate.
        Consult a healthcare professional
        for clinical pregnancy dating.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}