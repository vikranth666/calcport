import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function GcsCalculatorUI() {

  const [eye, setEye] =
    useState("");

  const [verbal, setVerbal] =
    useState("");

  const [motor, setMotor] =
    useState("");


  const result = useMemo(() => {

    if (
      eye === "" ||
      verbal === "" ||
      motor === ""
    ) {
      return null;
    }

    return (
      Number(eye) +
      Number(verbal) +
      Number(motor)
    );

  }, [
    eye,
    verbal,
    motor,
  ]);


  const resetCalculator = () => {

    setEye("");
    setVerbal("");
    setMotor("");

  };


  return (

    <CalculatorContainer>

      <div className="input-group">

        <label>
          Eye Response
        </label>

        <select
          value={eye}
          onChange={(event) =>
            setEye(event.target.value)
          }
        >

          <option value="">
            Select Response
          </option>

          <option value="4">
            4 - Spontaneous
          </option>

          <option value="3">
            3 - To Speech
          </option>

          <option value="2">
            2 - To Pain
          </option>

          <option value="1">
            1 - No Response
          </option>

        </select>

      </div>


      <div className="input-group">

        <label>
          Verbal Response
        </label>

        <select
          value={verbal}
          onChange={(event) =>
            setVerbal(event.target.value)
          }
        >

          <option value="">
            Select Response
          </option>

          <option value="5">
            5 - Oriented
          </option>

          <option value="4">
            4 - Confused
          </option>

          <option value="3">
            3 - Inappropriate Words
          </option>

          <option value="2">
            2 - Incomprehensible Sounds
          </option>

          <option value="1">
            1 - No Response
          </option>

        </select>

      </div>


      <div className="input-group">

        <label>
          Motor Response
        </label>

        <select
          value={motor}
          onChange={(event) =>
            setMotor(event.target.value)
          }
        >

          <option value="">
            Select Response
          </option>

          <option value="6">
            6 - Obeys Commands
          </option>

          <option value="5">
            5 - Localizes Pain
          </option>

          <option value="4">
            4 - Withdraws From Pain
          </option>

          <option value="3">
            3 - Abnormal Flexion
          </option>

          <option value="2">
            2 - Extension
          </option>

          <option value="1">
            1 - No Response
          </option>

        </select>

      </div>


      <ResultGrid>

        <ResultBox
          label="GCS Score"
          value={
            result
              ? `${result} / 15`
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