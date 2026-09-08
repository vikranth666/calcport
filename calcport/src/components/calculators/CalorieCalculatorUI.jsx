import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";

export default function CalorieCalculatorUI() {

  const [gender, setGender] =
    useState("male");

  const [age, setAge] =
    useState("");

  const [weight, setWeight] =
    useState("");

  const [height, setHeight] =
    useState("");

  const [activity, setActivity] =
    useState("1.2");

  const result = useMemo(() => {

    if (
      age === "" ||
      weight === "" ||
      height === ""
    ) {
      return null;
    }

    const ageNumber = Number(age);
    const weightNumber = Number(weight);
    const heightNumber = Number(height);
    const activityLevel = Number(activity);

    if (
      !Number.isFinite(ageNumber) ||
      !Number.isFinite(weightNumber) ||
      !Number.isFinite(heightNumber) ||
      ageNumber <= 0 ||
      weightNumber <= 0 ||
      heightNumber <= 0
    ) {
      return null;
    }

    let bmr;

    if (gender === "male") {

      bmr =
        10 * weightNumber +
        6.25 * heightNumber -
        5 * ageNumber +
        5;

    } else {

      bmr =
        10 * weightNumber +
        6.25 * heightNumber -
        5 * ageNumber -
        161;
    }

    const maintenance =
      bmr * activityLevel;

    const weightLoss =
      maintenance - 500;

    const weightGain =
      maintenance + 500;

    return {
      maintenance,
      weightLoss:
        Math.max(weightLoss, 0),
      weightGain,
    };

  }, [
    gender,
    age,
    weight,
    height,
    activity,
  ]);

  const formatCalories = (value) =>
    Math.round(value)
      .toLocaleString("en-IN");

  const resetCalculator = () => {

    setGender("male");

    setAge("");

    setWeight("");

    setHeight("");

    setActivity("1.2");
  };

  return (
    <CalculatorContainer>

      <div className="input-group">

        <label>
          Gender
        </label>

        <select
          value={gender}
          onChange={(event) =>
            setGender(event.target.value)
          }
        >
          <option value="male">
            Male
          </option>

          <option value="female">
            Female
          </option>

        </select>

      </div>


      <div className="input-group">

        <label>
          Age
        </label>

        <input
          type="number"
          value={age}
          placeholder="e.g. 25"
          min="1"
          onChange={(event) =>
            setAge(event.target.value)
          }
        />

      </div>


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
          Height (cm)
        </label>

        <input
          type="number"
          value={height}
          placeholder="e.g. 175"
          min="1"
          onChange={(event) =>
            setHeight(event.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Activity Level
        </label>

        <select
          value={activity}
          onChange={(event) =>
            setActivity(event.target.value)
          }
        >

          <option value="1.2">
            Sedentary
          </option>

          <option value="1.375">
            Lightly Active
          </option>

          <option value="1.55">
            Moderately Active
          </option>

          <option value="1.725">
            Very Active
          </option>

          <option value="1.9">
            Extra Active
          </option>

        </select>

      </div>


      <ResultGrid>

        <ResultBox
          label="Maintain Weight"
          value={
            result
              ? `${formatCalories(
                  result.maintenance
                )} kcal`
              : "—"
          }
        />

        <ResultBox
          label="Weight Loss"
          value={
            result
              ? `${formatCalories(
                  result.weightLoss
                )} kcal`
              : "—"
          }
        />

        <ResultBox
          label="Weight Gain"
          value={
            result
              ? `${formatCalories(
                  result.weightGain
                )} kcal`
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