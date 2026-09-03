import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import AdPlaceholder from "../AdPlaceholder";
import ResetButton from "../ResetButton";
import ResultGrid from "../ResultGrid";

export default function BmiCalculatorUI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const resetCalculator = () => {
  setWeight("");
  setHeight("");
};

  const result = useMemo(() => {
    const weightValue = Number(weight);
    const heightValue = Number(height);

    if (
      weightValue <= 0 ||
      heightValue <= 0
    ) {
      return {
        bmi: 0,
        category: "",
      };
    }

    const heightInMeters =
      heightValue / 100;

    const bmi =
      weightValue /
      (heightInMeters * heightInMeters);

    let category;

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }

    return {
      bmi,
      category,
    };
  }, [weight, height]);

  return (
    <>
      <CalculatorContainer>
        <InputField
          label="Weight (kg)"
          placeholder="Enter your weight"
          value={weight}
          onChange={(event) =>
            setWeight(event.target.value)
          }
        />

        <InputField
          label="Height (cm)"
          placeholder="Enter your height"
          value={height}
          onChange={(event) =>
            setHeight(event.target.value)
          }
        />

        <ResultGrid>
  <ResultBox
    label="Your BMI"
    value={
      result.bmi > 0
        ? result.bmi.toFixed(1)
        : "—"
    }
    copyValue={
      result.bmi > 0
        ? result.bmi.toFixed(1)
        : "—"
    }
  />

  <ResultBox
    label="Category"
    value={
      result.category || "—"
    }
    copyValue={
      result.category || "—"
    }
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