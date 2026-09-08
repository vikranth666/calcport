import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";

export default function ElectricityBillCalculatorUI() {
  const [units, setUnits] = useState("");
  const [rate, setRate] = useState("");
  const [fixedCharge, setFixedCharge] = useState("");

  const result = useMemo(() => {
    const unitsValue = Number(units);
    const rateValue = Number(rate);
    const fixedChargeValue = Number(fixedCharge || 0);

    if (
      !Number.isFinite(unitsValue) ||
      !Number.isFinite(rateValue) ||
      !Number.isFinite(fixedChargeValue) ||
      unitsValue < 0 ||
      rateValue < 0 ||
      fixedChargeValue < 0
    ) {
      return null;
    }

    if (!units.trim() || !rate.trim()) {
      return null;
    }

    const energyCharge = unitsValue * rateValue;
    const totalBill = energyCharge + fixedChargeValue;
    const effectiveRate =
      unitsValue > 0 ? totalBill / unitsValue : 0;

    return {
      energyCharge,
      totalBill,
      effectiveRate,
    };
  }, [units, rate, fixedCharge]);

  const formatNumber = (value) => {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const resetCalculator = () => {
    setUnits("");
    setRate("");
    setFixedCharge("");
  };

  return (
    <CalculatorContainer>
      <InputField
        label="Units Consumed (kWh)"
        value={units}
        placeholder="e.g. 250"
        min={0}
        step="0.01"
        onChange={(event) => setUnits(event.target.value)}
      />

      <InputField
        label="Rate Per Unit (₹)"
        value={rate}
        placeholder="e.g. 8"
        min={0}
        step="0.01"
        onChange={(event) => setRate(event.target.value)}
      />

      <InputField
        label="Fixed Charges (₹)"
        value={fixedCharge}
        placeholder="e.g. 100"
        min={0}
        step="0.01"
        onChange={(event) =>
          setFixedCharge(event.target.value)
        }
      />

      <ResultGrid>
        <ResultBox
          label="Energy Charge"
          value={
            result
              ? `₹${formatNumber(result.energyCharge)}`
              : "—"
          }
          copyValue={
            result ? String(result.energyCharge) : ""
          }
        />

        <ResultBox
          label="Estimated Total Bill"
          value={
            result
              ? `₹${formatNumber(result.totalBill)}`
              : "—"
          }
          copyValue={
            result ? String(result.totalBill) : ""
          }
        />

        <ResultBox
          label="Effective Cost Per Unit"
          value={
            result
              ? `₹${formatNumber(result.effectiveRate)}`
              : "—"
          }
          copyValue={
            result ? String(result.effectiveRate) : ""
          }
        />
      </ResultGrid>

      <ResetButton onReset={resetCalculator} />
    </CalculatorContainer>
  );
}