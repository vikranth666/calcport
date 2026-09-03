import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";
import AdPlaceholder from "../AdPlaceholder";

export default function PercentageCalculatorUI() {
  const [percentage, setPercentage] =
    useState("");

  const [number, setNumber] =
    useState("");

  const result = useMemo(() => {
    const percentValue =
      Number(percentage);

    const numberValue =
      Number(number);

    if (
      percentage === "" ||
      number === ""
    ) {
      return null;
    }

    if (
      !Number.isFinite(percentValue) ||
      !Number.isFinite(numberValue)
    ) {
      return null;
    }

    return (
      (percentValue / 100) *
      numberValue
    );
  }, [percentage, number]);

  const resetCalculator = () => {
    setPercentage("");
    setNumber("");
  };

  const formattedResult =
    result !== null
      ? result.toLocaleString("en-IN", {
          maximumFractionDigits: 4,
        })
      : "—";

  return (
    <>
      <CalculatorContainer>
        <InputField
          label="Percentage"
          value={percentage}
          placeholder="e.g. 20"
          min={0}
          onChange={(event) =>
            setPercentage(
              event.target.value
            )
          }
        />

        <InputField
          label="Number"
          value={number}
          placeholder="e.g. 500"
          onChange={(event) =>
            setNumber(
              event.target.value
            )
          }
        />

        <ResultGrid>
          <ResultBox
            label="Result"
            value={formattedResult}
            copyValue={formattedResult}
          />
        </ResultGrid>

        <ResetButton
          onReset={resetCalculator}
        />
      </CalculatorContainer>

      <AdPlaceholder />

    </>
  );
}