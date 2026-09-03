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

export default function DiscountCalculatorUI() {

  const [price, setPrice] = useState("");

  const [discount, setDiscount] =
    useState("");

  const result = useMemo(() => {

    if (
      price === "" ||
      discount === ""
    ) {
      return null;
    }

    const originalPrice = Number(price);

    const discountPercentage =
      Number(discount);

    if (
      !Number.isFinite(originalPrice) ||
      !Number.isFinite(discountPercentage) ||
      originalPrice < 0 ||
      discountPercentage < 0
    ) {
      return null;
    }

    const discountAmount =
      (originalPrice * discountPercentage) /
      100;

    const finalPrice =
      originalPrice - discountAmount;

    return {
      discountAmount,
      finalPrice,
    };

  }, [price, discount]);

  const resetCalculator = () => {
    setPrice("");
    setDiscount("");
  };

  const formatNumber = (value) => {

    if (value === null) {
      return "—";
    }

    return value.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    );
  };

  return (
    <CalculatorContainer>

      <InputField
        label="Original Price"
        value={price}
        placeholder="e.g. 1000"
        min={0}
        onChange={(event) =>
          setPrice(event.target.value)
        }
      />

      <InputField
        label="Discount (%)"
        value={discount}
        placeholder="e.g. 20"
        min={0}
        max={100}
        onChange={(event) =>
          setDiscount(event.target.value)
        }
      />

      <ResultGrid>

        <ResultBox
          label="Discount Amount"
          value={
            result
              ? `₹${formatNumber(
                  result.discountAmount
                )}`
              : "—"
          }
        />

        <ResultBox
          label="Final Price"
          value={
            result
              ? `₹${formatNumber(
                  result.finalPrice
                )}`
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