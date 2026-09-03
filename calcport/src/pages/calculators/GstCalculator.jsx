import { useState } from "react";

import CalculatorLayout from "../../components/CalculatorLayout";

import CalculatorContainer from "../../components/CalculatorContainer";

import InputField from "../../components/InputField";

import ResultBox from "../../components/ResultBox";

import AdPlaceholder from "../../components/AdPlaceholder";

import InfoSection from "../../components/InfoSection";

import RelatedCalculators from "../../components/RelatedCalculators";

import Seo from "../../components/Seo";

export default function GstCalculator() {

  const [amount, setAmount] = useState("");

  const [gstRate, setGstRate] = useState("");

  const gstAmount =
amount && gstRate
  ? (Number(amount) * Number(gstRate)) / 100
  : 0;

  const totalAmount =
    Number(amount) + gstAmount;


  return (
<>

    <Seo
      title="GST Calculator"
      description="
      Calculate GST instantly with
      our free online GST calculator.
      "
    />

    <CalculatorLayout
      title="GST Calculator"
      description="
      Calculate GST instantly with our free
      online GST calculator.
      "
    >
         

      <CalculatorContainer>

        <InputField
          label="Amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <InputField
          label="GST Rate (%)"
          placeholder="Enter GST percentage"
          value={gstRate}
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

      <InfoSection title="What is GST?">

        <p>
          GST (Goods and Services Tax) is an
          indirect tax applied on goods and
          services in India.
        </p>

      </InfoSection>

      <InfoSection title="GST Formula">

        <p>
          GST Amount = (Amount × GST Rate) / 100
        </p>

      </InfoSection>

      <InfoSection title="Example">

        <p>
          If the amount is ₹1000 and GST rate
          is 18%, then:
        </p>

        <p>
          GST = ₹180
        </p>

        <p>
          Total = ₹1180
        </p>

      </InfoSection>

      <RelatedCalculators />

      

    </CalculatorLayout>
    </>
  );
}