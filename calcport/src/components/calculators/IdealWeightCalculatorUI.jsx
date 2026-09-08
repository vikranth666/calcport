import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


export default function IdealWeightCalculatorUI() {

  const [height, setHeight] =
    useState("");


  const result = useMemo(() => {

    if (height === "") {
      return null;
    }

    const heightCm =
      Number(height);


    if (
      !Number.isFinite(heightCm) ||
      heightCm <= 0
    ) {
      return null;
    }


    const heightMeter =
      heightCm / 100;


    const minimumWeight =
      18.5 *
      heightMeter *
      heightMeter;


    const maximumWeight =
      24.9 *
      heightMeter *
      heightMeter;


    return {
      minimumWeight,
      maximumWeight,
    };

  }, [height]);


  const formatWeight = (value) =>
    value.toFixed(1);


  const resetCalculator = () => {
    setHeight("");
  };


  return (

    <CalculatorContainer>


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
          label="Healthy Weight Range"
          value={
            result
              ? `${formatWeight(
                  result.minimumWeight
                )} - ${formatWeight(
                  result.maximumWeight
                )} kg`
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