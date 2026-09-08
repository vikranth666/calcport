import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";

export default function GstCalculatorUI() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [mode, setMode] = useState("add");

  const result = useMemo(() => {
    const amountValue = Number(amount);
    const rateValue = Number(gstRate);

    if (
      !amount.trim() ||
      !gstRate.trim() ||
      !Number.isFinite(amountValue) ||
      !Number.isFinite(rateValue) ||
      amountValue < 0 ||
      rateValue < 0
    ) {
      return null;
    }

    if (mode === "add") {
      const gstAmount =
        (amountValue * rateValue) / 100;

      const totalAmount =
        amountValue + gstAmount;

      return {
        baseAmount: amountValue,
        gstAmount,
        totalAmount,
      };
    }

    const baseAmount =
      amountValue / (1 + rateValue / 100);

    const gstAmount =
      amountValue - baseAmount;

    return {
      baseAmount,
      gstAmount,
      totalAmount: amountValue,
    };
  }, [amount, gstRate, mode]);

  const formatNumber = (value) => {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const resetCalculator = () => {
    setAmount("");
    setGstRate("");
    setMode("add");
  };

  return (
    <CalculatorContainer>
      <div className="input-group">
        <label htmlFor="gst-mode">
          GST Calculation
        </label>

        <select
          id="gst-mode"
          value={mode}
          onChange={(event) =>
            setMode(event.target.value)
          }
        >
          <option value="add">
            Add GST
          </option>

          <option value="remove">
            Remove GST
          </option>
        </select>
      </div>

      <InputField
        label={
          mode === "add"
            ? "Amount Before GST"
            : "Amount Including GST"
        }
        value={amount}
        placeholder="e.g. 1000"
        min={0}
        step="0.01"
        onChange={(event) =>
          setAmount(event.target.value)
        }
      />

      <InputField
        label="GST Rate (%)"
        value={gstRate}
        placeholder="e.g. 18"
        min={0}
        step="0.01"
        onChange={(event) =>
          setGstRate(event.target.value)
        }
      />

      <ResultGrid>
        <ResultBox
          label="Base Amount"
          value={
            result
              ? `₹${formatNumber(result.baseAmount)}`
              : "—"
          }
          copyValue={
            result
              ? String(result.baseAmount)
              : ""
          }
        />

        <ResultBox
          label="GST Amount"
          value={
            result
              ? `₹${formatNumber(result.gstAmount)}`
              : "—"
          }
          copyValue={
            result
              ? String(result.gstAmount)
              : ""
          }
        />

        <ResultBox
          label="Total Amount"
          value={
            result
              ? `₹${formatNumber(result.totalAmount)}`
              : "—"
          }
          copyValue={
            result
              ? String(result.totalAmount)
              : ""
          }
        />
      </ResultGrid>

      <ResetButton onReset={resetCalculator} />
    </CalculatorContainer>
  );
}