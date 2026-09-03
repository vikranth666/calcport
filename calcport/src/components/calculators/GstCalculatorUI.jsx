import { useState } from "react";

import CalculatorContainer
from "../CalculatorContainer";

import InputField
from "../InputField";

import ResultBox
from "../ResultBox";

import AdPlaceholder
from "../AdPlaceholder";


export default function GstCalculatorUI() {

  const [amount, setAmount] =
    useState("");

  const [gstRate, setGstRate] =
    useState("");

  const gstAmount =
    amount && gstRate
      ? (Number(amount) *
          Number(gstRate)) /
        100
      : 0;

  const totalAmount =
    amount && gstRate
      ? Number(amount) + gstAmount
      : 0;


  return (
    <>

      <CalculatorContainer>

        <InputField
          label="Amount"
          value={amount}
          placeholder="
          Enter amount
          "
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <InputField
          label="GST Rate (%)"
          value={gstRate}
          placeholder="
          Enter GST %
          "
          onChange={(e) =>
            setGstRate(e.target.value)
          }
        />

        <ResultBox
          label="GST Amount"
          value={`₹${gstAmount.toFixed(2)}`}
        />

        <ResultBox
          label="Total Amount"
          value={`₹${totalAmount.toFixed(2)}`}
        />

      </CalculatorContainer>

      <AdPlaceholder />

    </>
  );
}