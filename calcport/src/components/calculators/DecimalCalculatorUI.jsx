import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import InputField
  from "../InputField";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function DecimalCalculatorUI() {

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operation, setOperation] = useState("+");


  const result = useMemo(() => {

    if (
      number1 === "" ||
      number2 === ""
    ) {
      return null;
    }


    const a = Number(number1);
    const b = Number(number2);


    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b)
    ) {
      return null;
    }


    let value;


    switch (operation) {

      case "+":
        value = a + b;
        break;

      case "-":
        value = a - b;
        break;

      case "*":
        value = a * b;
        break;

      case "/":

        if (b === 0) {
          return {
            error: "Cannot divide by zero.",
          };
        }

        value = a / b;
        break;

      default:
        return null;
    }


    return {
      value,
    };

  }, [
    number1,
    number2,
    operation,
  ]);


  const resetCalculator = () => {
    setNumber1("");
    setNumber2("");
    setOperation("+");
  };


  const formattedResult =
    result && !result.error
      ? result.value.toLocaleString(
          "en-IN",
          {
            maximumFractionDigits: 10,
          }
        )
      : "—";


  return (
    <CalculatorContainer>

      <InputField
        label="First Number"
        value={number1}
        placeholder="e.g. 12.5"
        step="any"
        onChange={(event) =>
          setNumber1(event.target.value)
        }
      />


      <div className="input-field">

        <label>
          Operation
        </label>

        <select
          value={operation}
          onChange={(event) =>
            setOperation(event.target.value)
          }
        >

          <option value="+">
            Addition (+)
          </option>

          <option value="-">
            Subtraction (-)
          </option>

          <option value="*">
            Multiplication (×)
          </option>

          <option value="/">
            Division (÷)
          </option>

        </select>

      </div>


      <InputField
        label="Second Number"
        value={number2}
        placeholder="e.g. 7.5"
        step="any"
        onChange={(event) =>
          setNumber2(event.target.value)
        }
      />


      <ResultGrid>

        <ResultBox
          label="Result"
          value={
            result?.error
              ? result.error
              : formattedResult
          }
          copyValue={
            result && !result.error
              ? String(result.value)
              : ""
          }
        />

      </ResultGrid>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>
  );
}