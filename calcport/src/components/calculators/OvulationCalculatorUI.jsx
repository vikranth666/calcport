import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function OvulationCalculatorUI() {

  const [periodDate, setPeriodDate] =
    useState("");

  const [cycleLength, setCycleLength] =
    useState("28");


  const result = useMemo(() => {

    if (!periodDate) {
      return null;
    }

    const startDate =
      new Date(
        `${periodDate}T00:00:00`
      );

    const cycle =
      Number(cycleLength);

    if (
      Number.isNaN(
        startDate.getTime()
      ) ||
      !Number.isFinite(cycle) ||
      cycle < 21 ||
      cycle > 45
    ) {
      return null;
    }

    const ovulationDate =
      new Date(startDate);

    // Approximate estimate:
    // around 14 days before
    // the next period

    ovulationDate.setDate(
      ovulationDate.getDate() +
      cycle - 14
    );


    const fertileStart =
      new Date(ovulationDate);

    fertileStart.setDate(
      fertileStart.getDate() - 5
    );


    const fertileEnd =
      new Date(ovulationDate);

    fertileEnd.setDate(
      fertileEnd.getDate() + 1
    );


    return {
      ovulationDate,
      fertileStart,
      fertileEnd,
    };

  }, [
    periodDate,
    cycleLength,
  ]);


  const formatDate = (date) => {

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  };


  const resetCalculator = () => {

    setPeriodDate("");
    setCycleLength("28");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          First Day of Last Period
        </label>

        <input
          type="date"
          value={periodDate}
          onChange={(event) =>
            setPeriodDate(
              event.target.value
            )
          }
        />

      </div>


      <div className="input-group">

        <label>
          Average Cycle Length (Days)
        </label>

        <input
          type="number"
          value={cycleLength}
          min="21"
          max="45"
          onChange={(event) =>
            setCycleLength(
              event.target.value
            )
          }
        />

      </div>


      <ResultGrid>

        <ResultBox
          label="Estimated Ovulation"
          value={
            result
              ? formatDate(
                  result.ovulationDate
                )
              : "—"
          }
        />


        <ResultBox
          label="Estimated Fertile Window"
          value={
            result
              ? `${formatDate(
                  result.fertileStart
                )} - ${formatDate(
                  result.fertileEnd
                )}`
              : "—"
          }
        />

      </ResultGrid>


      <p className="calculator-note">
        Results are estimates only and
        should not be used as a method
        of contraception.
      </p>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}