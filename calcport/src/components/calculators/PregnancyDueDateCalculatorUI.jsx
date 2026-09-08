import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function PregnancyDueDateCalculatorUI() {

  const [lmp, setLmp] =
    useState("");


  const result = useMemo(() => {

    if (!lmp) {
      return null;
    }

    const lmpDate =
      new Date(`${lmp}T00:00:00`);

    if (
      Number.isNaN(
        lmpDate.getTime()
      )
    ) {
      return null;
    }

    const dueDate =
      new Date(lmpDate);

    dueDate.setDate(
      dueDate.getDate() + 280
    );

    return {
      dueDate,
    };

  }, [lmp]);


  const formatDate = (date) => {

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };


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
          label="Estimated Due Date"
          value={
            result
              ? formatDate(
                  result.dueDate
                )
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        This result is an estimate and
        is not a substitute for medical care.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}