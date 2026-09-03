import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import ResultBox from "../ResultBox";
import AdPlaceholder from "../AdPlaceholder";

import RelatedCalculators from "../RelatedCalculators";
import ResetButton from "../ResetButton";

export default function AgeCalculatorUI() {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => {
    if (!birthDate) {
      return null;
    }

    const birth = new Date(
      `${birthDate}T00:00:00`
    );

    const today = new Date();

    if (birth > today) {
      return {
        error:
          "Birth date cannot be in the future.",
      };
    }

    let years =
      today.getFullYear() -
      birth.getFullYear();

    let months =
      today.getMonth() -
      birth.getMonth();

    let days =
      today.getDate() -
      birth.getDate();

    if (days < 0) {
      months -= 1;

      const previousMonthDays =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        ).getDate();

      days += previousMonthDays;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return {
      years,
      months,
      days,
    };
  }, [birthDate]);

  const resetCalculator = () => {
    setBirthDate("");
  };


  return (
    <>
      <CalculatorContainer>
        <div className="input-group">
          <label htmlFor="birth-date">
            Date of Birth
          </label>

          <input
            id="birth-date"
            type="date"
            value={birthDate}
            max={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={(event) =>
              setBirthDate(event.target.value)
            }
          />
        </div>

        {result?.error ? (
          <p className="input-error">
            {result.error}
          </p>
        ) : (
          <>
            <ResultBox
              label="Age"
              value={
                result
                  ? `${result.years} years, ${result.months} months, ${result.days} days`
                  : "—"
              }
            />
          </>
        )}

        <ResetButton
          onReset={resetCalculator}
        />
      </CalculatorContainer>

      <AdPlaceholder />


      <RelatedCalculators
        currentCalculator="age-calculator"
      />
    </>
  );
}