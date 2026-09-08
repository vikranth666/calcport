import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function BmrCalculatorUI() {

  const [gender, setGender] =
    useState("male");

  const [age, setAge] =
    useState("");

  const [weight, setWeight] =
    useState("");

  const [height, setHeight] =
    useState("");


  const result = useMemo(() => {

    if (
      age === "" ||
      weight === "" ||
      height === ""
    ) {
      return null;
    }

    const ageNumber =
      Number(age);

    const weightNumber =
      Number(weight);

    const heightNumber =
      Number(height);


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


    return Math.round(bmr);

  }, [
    gender,
    age,
    weight,
    height,
  ]);


  const resetCalculator = () => {

    setGender("male");
    setAge("");
    setWeight("");
    setHeight("");

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


      <ResultGrid>

        <ResultBox
          label="Your BMR"
          value={
            result
              ? `${result} kcal/day`
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