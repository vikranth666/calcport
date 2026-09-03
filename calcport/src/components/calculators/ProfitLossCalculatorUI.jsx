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

export default function ProfitLossCalculatorUI() {
  const [costPrice, setCostPrice] =
    useState("");

  const [sellingPrice, setSellingPrice] =
    useState("");

  const result = useMemo(() => {
    if (
      costPrice === "" ||
      sellingPrice === ""
    ) {
      return null;
    }

    const cost = Number(costPrice);
    const selling = Number(sellingPrice);

    if (
      !Number.isFinite(cost) ||
      !Number.isFinite(selling) ||
      cost < 0 ||
      selling < 0
    ) {
      return null;
    }

    // Cost price cannot be zero when
    // calculating profit/loss percentage.
    if (cost === 0) {
      return null;
    }

    const difference = selling - cost;

    const percentage =
      Math.abs(difference / cost) * 100;

    if (difference > 0) {
      return {
        type: "Profit",
        amount: difference,
        percentage,
      };
    }

    if (difference < 0) {
      return {
        type: "Loss",
        amount: Math.abs(difference),
        percentage,
      };
    }

    return {
      type: "No Profit / No Loss",
      amount: 0,
      percentage: 0,
    };
  }, [costPrice, sellingPrice]);

  const resetCalculator = () => {
    setCostPrice("");
    setSellingPrice("");
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <CalculatorContainer>

      <InputField
        label="Cost Price"
        value={costPrice}
        placeholder="e.g. 1000"
        min={0}
        onChange={(event) =>
          setCostPrice(event.target.value)
        }
      />

      <InputField
        label="Selling Price"
        value={sellingPrice}
        placeholder="e.g. 1200"
        min={0}
        onChange={(event) =>
          setSellingPrice(event.target.value)
        }
      />

      <ResultGrid>

        <ResultBox
          label="Result"
          value={
            result
              ? result.type
              : "—"
          }
        />

        <ResultBox
          label={
            result?.type === "Loss"
              ? "Loss Amount"
              : result?.type === "Profit"
              ? "Profit Amount"
              : "Amount"
          }
          value={
            result
              ? `₹${formatNumber(
                  result.amount
                )}`
              : "—"
          }
        />

        <ResultBox
          label={
            result?.type === "Loss"
              ? "Loss Percentage"
              : result?.type === "Profit"
              ? "Profit Percentage"
              : "Percentage"
          }
          value={
            result
              ? `${formatNumber(
                  result.percentage
                )}%`
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