import { useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import InputField from "../InputField";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";


export default function TipCalculatorUI() {

  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [people, setPeople] = useState("1");


  const result = useMemo(() => {

    const billAmount = Number(bill);
    const tipRate = Number(tipPercentage);
    const numberOfPeople = Number(people);


    if (
      !Number.isFinite(billAmount) ||
      !Number.isFinite(tipRate) ||
      !Number.isFinite(numberOfPeople) ||
      billAmount < 0 ||
      tipRate < 0 ||
      numberOfPeople < 1
    ) {
      return null;
    }


    const tipAmount =
      billAmount * (tipRate / 100);

    const totalBill =
      billAmount + tipAmount;

    const perPerson =
      totalBill / numberOfPeople;


    return {
      tipAmount,
      totalBill,
      perPerson,
    };

  }, [
    bill,
    tipPercentage,
    people,
  ]);


  const formatNumber = (value) => {

    return value.toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  };


  const resetCalculator = () => {

    setBill("");
    setTipPercentage("15");
    setPeople("1");

  };


  return (
    <CalculatorContainer>

      <InputField
        label="Bill Amount"
        value={bill}
        placeholder="e.g. 1000"
        min={0}
        step="0.01"
        onChange={(event) =>
          setBill(event.target.value)
        }
      />


      <div className="input-group">

        <label htmlFor="tip-percentage">
          Tip Percentage
        </label>

        <select
          id="tip-percentage"
          value={tipPercentage}
          onChange={(event) =>
            setTipPercentage(
              event.target.value
            )
          }
        >

          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="18">18%</option>
          <option value="20">20%</option>
          <option value="25">25%</option>
          <option value="30">30%</option>

        </select>

      </div>


      <InputField
        label="Number of People"
        value={people}
        placeholder="e.g. 2"
        min={1}
        step="1"
        onChange={(event) =>
          setPeople(event.target.value)
        }
      />


      <ResultGrid>

        <ResultBox
          label="Tip Amount"
          value={
            result
              ? formatNumber(
                  result.tipAmount
                )
              : "—"
          }
          copyValue={
            result
              ? String(result.tipAmount)
              : ""
          }
        />


        <ResultBox
          label="Total Bill"
          value={
            result
              ? formatNumber(
                  result.totalBill
                )
              : "—"
          }
          copyValue={
            result
              ? String(result.totalBill)
              : ""
          }
        />


        <ResultBox
          label="Amount Per Person"
          value={
            result
              ? formatNumber(
                  result.perPerson
                )
              : "—"
          }
          copyValue={
            result
              ? String(result.perPerson)
              : ""
          }
        />

      </ResultGrid>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>
  );
}