import { useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import ResultBox from "../ResultBox";
import ResetButton from "../ResetButton";


export default function ScientificCalculatorUI() {

  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");


  const appendValue = (value) => {

    setDisplay((current) =>
      current === "0"
        ? value
        : current + value
    );

  };


  const clearCalculator = () => {

    setDisplay("0");
    setExpression("");

  };


  const deleteLast = () => {

    setDisplay((current) => {

      if (current.length <= 1) {
        return "0";
      }

      return current.slice(0, -1);

    });

  };


  const calculate = () => {

    try {

      let exp = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI")
        .replace(/√/g, "Math.sqrt");


      exp = exp
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(");


      const result = Function(
        `"use strict"; return (${exp})`
      )();


      if (
        typeof result !== "number" ||
        !Number.isFinite(result)
      ) {
        throw new Error();
      }


      setExpression(display);

      setDisplay(
        Number(result.toFixed(12)).toString()
      );

    } catch {

      setDisplay("Error");

    }

  };


  const calculateFunction = (functionName) => {

    try {

      const value = Number(display);

      if (!Number.isFinite(value)) {
        throw new Error();
      }


      let result;


      if (functionName === "sin") {
        result = Math.sin(
          value * Math.PI / 180
        );
      }

      if (functionName === "cos") {
        result = Math.cos(
          value * Math.PI / 180
        );
      }

      if (functionName === "tan") {
        result = Math.tan(
          value * Math.PI / 180
        );
      }

      if (functionName === "log") {
        if (value <= 0) throw new Error();
        result = Math.log10(value);
      }

      if (functionName === "ln") {
        if (value <= 0) throw new Error();
        result = Math.log(value);
      }

      if (functionName === "sqrt") {
        if (value < 0) throw new Error();
        result = Math.sqrt(value);
      }

      if (functionName === "square") {
        result = value ** 2;
      }

      if (functionName === "reciprocal") {
        if (value === 0) throw new Error();
        result = 1 / value;
      }


      if (!Number.isFinite(result)) {
        throw new Error();
      }


      setExpression(
        `${functionName}(${display})`
      );

      setDisplay(
        Number(result.toFixed(12)).toString()
      );

    } catch {

      setDisplay("Error");

    }

  };

  const calculatePercentage = () => {
  try {
    const value = Number(display);

    if (!Number.isFinite(value)) {
      throw new Error();
    }

    const result = value / 100;

    setExpression(`${display}%`);

    setDisplay(
      Number(result.toFixed(12)).toString()
    );
  } catch {
    setDisplay("Error");
  }
};


  const handleButton = (value) => {

    if (display === "Error") {
       setDisplay("0");
       setExpression("");
    }


    if (
      value === "C"
    ) {
      clearCalculator();
      return;
    }


    if (
      value === "DEL"
    ) {
      deleteLast();
      return;
    }

    if (value === "%") {
      calculatePercentage();
      return;
    }


    if (
      value === "="
    ) {
      calculate();
      return;
    }


  if (
  [
    "sin",
    "cos",
    "tan",
    "log",
    "ln",
    "√",
    "square",
    "reciprocal",
  ].includes(value)
) {
  if (value === "√") {
    calculateFunction("sqrt");
  } else {
    calculateFunction(value);
  }

  return;
}


    appendValue(value);

  };


  const buttons = [

    ["sin", "cos", "tan", "log", "ln"],

    ["√", "x²", "1/x", "π", "DEL"],

    ["7", "8", "9", "÷", "C"],

    ["4", "5", "6", "×", "("],

    ["1", "2", "3", "-", ")"],

    ["0", ".", "%", "+", "="],

  ];


  return (

    <CalculatorContainer>

      <div className="scientific-calculator">

        <div className="scientific-display">

          <div className="scientific-expression">
            {expression}
          </div>

          <div className="scientific-value">
            {display}
          </div>

        </div>


        <div className="scientific-keypad">

          {buttons.map((row, rowIndex) => (

            <div
              className="scientific-row"
              key={rowIndex}
            >

              {row.map((button) => (

                <button
                  type="button"
                  key={button}
                  className={`scientific-button ${
                    button === "="
                      ? "scientific-equals"
                      : ""
                  } ${
                    [
                      "sin",
                      "cos",
                      "tan",
                      "log",
                      "ln",
                      "√",
                      "x²",
                      "1/x",
                    ].includes(button)
                      ? "scientific-function"
                      : ""
                  }`}
                  onClick={() => {

                    if (button === "x²") {
                      calculateFunction("square");
                      return;
                    }

                    if (button === "1/x") {
                      calculateFunction("reciprocal");
                      return;
                    }

                    handleButton(button);

                  }}
                >
                  {button}
                </button>

              ))}

            </div>

          ))}

        </div>

      </div>


      <ResultBox
        label="Current Result"
        value={display}
        copyValue={
          display !== "Error"
            ? display
            : ""
        }
      />


      <ResetButton
        onReset={clearCalculator}
      />

    </CalculatorContainer>

  );

}