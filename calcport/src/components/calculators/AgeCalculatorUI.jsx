import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";

export default function AgeCalculatorUI() {
  const [birthDate, setBirthDate] = useState("");
  const [asOfDate, setAsOfDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const result = useMemo(() => {
    if (!birthDate || !asOfDate) {
      return null;
    }

    const birth = new Date(`${birthDate}T00:00:00`);
    const current = new Date(`${asOfDate}T00:00:00`);

    if (
      Number.isNaN(birth.getTime()) ||
      Number.isNaN(current.getTime()) ||
      birth > current
    ) {
      return null;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;

      const previousMonth = new Date(
        current.getFullYear(),
        current.getMonth(),
        0
      );

      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const totalDays = Math.floor(
      (current - birth) / millisecondsPerDay
    );

    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    const nextBirthday = new Date(
      current.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (nextBirthday < current) {
      nextBirthday.setFullYear(
        current.getFullYear() + 1
      );
    }

    const daysUntilBirthday = Math.ceil(
      (nextBirthday - current) / millisecondsPerDay
    );

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      daysUntilBirthday,
    };
  }, [birthDate, asOfDate]);

  const resetCalculator = () => {
    setBirthDate("");
    setAsOfDate(
      new Date().toISOString().split("T")[0]
    );
  };

  return (
    <CalculatorContainer>
      <div className="input-group">
        <label htmlFor="birth-date">
          Date of Birth
        </label>

        <input
          id="birth-date"
          type="date"
          value={birthDate}
          max={asOfDate}
          onChange={(event) =>
            setBirthDate(event.target.value)
          }
        />
      </div>

      <div className="input-group">
        <label htmlFor="as-of-date">
          Calculate Age On
        </label>

        <input
          id="as-of-date"
          type="date"
          value={asOfDate}
          min={birthDate || undefined}
          onChange={(event) =>
            setAsOfDate(event.target.value)
          }
        />
      </div>

      <ResultGrid>
        <ResultBox
          label="Exact Age"
          value={
            result
              ? `${result.years} years, ${result.months} months, ${result.days} days`
              : "—"
          }
          copyValue={
            result
              ? `${result.years} years, ${result.months} months, ${result.days} days`
              : ""
          }
        />

        <ResultBox
          label="Total Months"
          value={
            result
              ? result.totalMonths.toLocaleString("en-IN")
              : "—"
          }
          copyValue={
            result
              ? String(result.totalMonths)
              : ""
          }
        />

        <ResultBox
          label="Total Weeks"
          value={
            result
              ? result.totalWeeks.toLocaleString("en-IN")
              : "—"
          }
          copyValue={
            result
              ? String(result.totalWeeks)
              : ""
          }
        />

        <ResultBox
          label="Total Days"
          value={
            result
              ? result.totalDays.toLocaleString("en-IN")
              : "—"
          }
          copyValue={
            result
              ? String(result.totalDays)
              : ""
          }
        />

        <ResultBox
          label="Next Birthday"
          value={
            result
              ? `${result.daysUntilBirthday} days`
              : "—"
          }
          copyValue={
            result
              ? String(result.daysUntilBirthday)
              : ""
          }
        />
      </ResultGrid>

      <ResetButton onReset={resetCalculator} />
    </CalculatorContainer>
  );
}