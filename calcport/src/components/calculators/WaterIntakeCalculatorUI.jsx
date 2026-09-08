import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function WaterIntakeCalculatorUI() {

  const [weight, setWeight] =
    useState("");

  const [activity, setActivity] =
    useState("0");


  const result = useMemo(() => {

    if (weight === "") {
      return null;
    }

    const weightNumber =
      Number(weight);

    const activityMinutes =
      Number(activity);


    if (
      !Number.isFinite(weightNumber) ||
      !Number.isFinite(activityMinutes) ||
      weightNumber <= 0
    ) {
      return null;
    }


    // Base estimate:
    // 35 ml per kg body weight

    const baseWater =
      weightNumber * 35;


    // Add approximately
    // 350 ml for every 30 minutes

    const activityWater =
      (activityMinutes / 30) *
      350;


    const totalMl =
      baseWater +
      activityWater;


    const totalLiters =
      totalMl / 1000;


    const glasses =
      totalMl / 250;


    return {
      totalLiters,
      glasses,
    };

  }, [
    weight,
    activity,
  ]);


  const resetCalculator = () => {

    setWeight("");
    setActivity("0");

  };


  return (

    <CalculatorContainer>


      <div className="input-group">

        <label>
          Weight (kg)
        </label>

        <input
          type="number"
          value={weight}
          placeholder="e.g. 70"
          min="1"
          onChange={(event) =>
            setWeight(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Daily Exercise (Minutes)
        </label>

        <select
          value={activity}
          onChange={(event) =>
            setActivity(event.target.value)
          }
        >

          <option value="0">
            No Exercise
          </option>

          <option value="30">
            Around 30 Minutes
          </option>

          <option value="60">
            Around 1 Hour
          </option>

          <option value="90">
            Around 1.5 Hours
          </option>

          <option value="120">
            Around 2 Hours
          </option>

        </select>

      </div>


      <ResultGrid>

        <ResultBox
          label="Estimated Daily Water"
          value={
            result
              ? `${result.totalLiters.toFixed(
                  1
                )} Liters`
              : "—"
          }
        />


        <ResultBox
          label="Approximate Glasses"
          value={
            result
              ? `${Math.round(
                  result.glasses
                )} Glasses`
              : "—"
          }
        />

      </ResultGrid>


      <ResetButton
        onReset={resetCalculator}
      />


    </CalculatorContainer>

  );

}