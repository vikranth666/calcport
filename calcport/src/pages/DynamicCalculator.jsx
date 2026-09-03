import { useParams }
from "react-router-dom";

import { calculatorsConfig }
from "../config/calculatorsConfig";

import InfoSection
  from "../components/InfoSection";

import FaqSection
  from "../components/FaqSection";

import RelatedCalculators
  from "../components/RelatedCalculators";

import Seo from "../components/Seo";

import CalculatorLayout
from "../components/CalculatorLayout";

import GstCalculatorUI
from "../components/calculators/GstCalculatorUI";

import EmiCalculatorUI
  from "../components/calculators/EmiCalculatorUI";

import BmiCalculatorUI
  from "../components/calculators/BmiCalculatorUI";

import AgeCalculatorUI
  from "../components/calculators/AgeCalculatorUI";

import PercentageCalculatorUI
  from "../components/calculators/PercentageCalculatorUI";

import DiscountCalculatorUI
  from "../components/calculators/DiscountCalculatorUI";

import AverageCalculatorUI
  from "../components/calculators/AverageCalculatorUI";

import RatioCalculatorUI
  from "../components/calculators/RatioCalculatorUI";

import ProfitLossCalculatorUI
  from "../components/calculators/ProfitLossCalculatorUI";

export default function DynamicCalculator() {

  const { slug } = useParams();

  const calculator =
    calculatorsConfig.find(
      (item) => item.slug === slug
    );

  if (!calculator) {
    return <h1>Calculator Not Found</h1>;
  }

  const renderCalculator = () => {

  switch (calculator.type) {
    case "gst":
      return <GstCalculatorUI />;

    case "emi":
      return <EmiCalculatorUI />;

    case "bmi":
      return <BmiCalculatorUI />;

    case "age":
      return <AgeCalculatorUI />;

    case "percentage":
      return <PercentageCalculatorUI />;

    case "discount":
      return <DiscountCalculatorUI />;

    case "average":
      return <AverageCalculatorUI />;

    case "ratio":
      return <RatioCalculatorUI />;

    case "profit-loss":
      return <ProfitLossCalculatorUI />;


    default:
      return (
        <h2>
          Calculator UI Missing
        </h2>
      );
  }
};

  return (
    <>

      <Seo
        title={calculator.seo.title}
        description={
          calculator.seo.description
        }
      />

      <CalculatorLayout
  title={calculator.title}
  description={
    calculator.description
  }
>
  {renderCalculator()}

  {calculator.seo?.intro && (
    <InfoSection
      title={`About ${calculator.title}`}
    >
      <p>
        {calculator.seo.intro}
      </p>
    </InfoSection>
  )}

  {calculator.seo?.sections?.map(
    (section) => (
      <InfoSection
        key={section.title}
        title={section.title}
      >
        <p>
          {section.content}
        </p>
      </InfoSection>
    )
  )}

  {calculator.faqs?.length > 0 && (
    <FaqSection
      faqs={calculator.faqs}
    />
  )}

  <RelatedCalculators
  currentCalculator={calculator.slug}
/>
</CalculatorLayout>
    </>
  );
}