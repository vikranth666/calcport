import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";

export default function FuelCostCalculatorUI() {
  const [distance, setDistance] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");

  const result = useMemo(() => {
    const distanceValue = Number(distance);
    const mileageValue = Number(mileage);
    const fuelPriceValue = Number(fuelPrice);

    if (
      !Number.isFinite(distanceValue) ||
      !Number.isFinite(mileageValue) ||
      !Number.isFinite(fuelPriceValue) ||
      distanceValue <= 0 ||
      mileageValue <= 0 ||
      fuelPriceValue < 0
    ) {
      return null;
    }

    const fuelRequired = distanceValue / mileageValue;
    const totalCost = fuelRequired * fuelPriceValue;
    const costPerKm = totalCost / distanceValue;

    return {
      fuelRequired,
      totalCost,
      costPerKm,
    };
  }, [distance, mileage, fuelPrice]);

  const formatNumber = (value, decimals = 2) => {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const resetCalculator = () => {
    setDistance("");
    setMileage("");
    setFuelPrice("");
  };

  return (
    <CalculatorContainer>
      <InputField
        label="Distance"
        value={distance}
        placeholder="e.g. 300"
        min={0}
        step="0.1"
        onChange={(event) => setDistance(event.target.value)}
      />

      <InputField
        label="Vehicle Mileage (km/L)"
        value={mileage}
        placeholder="e.g. 15"
        min={0}
        step="0.1"
        onChange={(event) => setMileage(event.target.value)}
      />

      <InputField
        label="Fuel Price per Liter"
        value={fuelPrice}
        placeholder="e.g. 100"
        min={0}
        step="0.01"
        onChange={(event) => setFuelPrice(event.target.value)}
      />

      <ResultGrid>
        <ResultBox
          label="Fuel Required"
          value={
            result
              ? `${formatNumber(result.fuelRequired)} L`
              : "—"
          }
          copyValue={
            result ? String(result.fuelRequired) : ""
          }
        />

        <ResultBox
          label="Total Fuel Cost"
          value={
            result
              ? `₹${formatNumber(result.totalCost)}`
              : "—"
          }
          copyValue={
            result ? String(result.totalCost) : ""
          }
        />

        <ResultBox
          label="Cost Per Kilometer"
          value={
            result
              ? `₹${formatNumber(result.costPerKm)}`
              : "—"
          }
          copyValue={
            result ? String(result.costPerKm) : ""
          }
        />
      </ResultGrid>

      <ResetButton onReset={resetCalculator} />
    </CalculatorContainer>
  );
}