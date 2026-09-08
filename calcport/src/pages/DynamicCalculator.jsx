import { useParams }
from "react-router-dom";

import { calculatorsConfig }
from "../config/calculatorsConfig";

import InfoSection
  from "../components/InfoSection";

import FaqSection
  from "../components/FaqSection";

import AdSlot
  from "../components/AdSlot";

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

import SimpleInterestCalculatorUI
  from "../components/calculators/SimpleInterestCalculatorUI";

import CompoundInterestCalculatorUI
  from "../components/calculators/CompoundInterestCalculatorUI";

import SipCalculatorUI
  from "../components/calculators/SipCalculatorUI";

import FdCalculatorUI
  from "../components/calculators/FdCalculatorUI";

import RdCalculatorUI
  from "../components/calculators/RdCalculatorUI";

import LoanCalculatorUI
  from "../components/calculators/LoanCalculatorUI";

import SalaryCalculatorUI
  from "../components/calculators/SalaryCalculatorUI";

import FractionCalculatorUI
  from "../components/calculators/FractionCalculatorUI";

import GcdLcmCalculatorUI
  from "../components/calculators/GcdLcmCalculatorUI";

import DecimalCalculatorUI
  from "../components/calculators/DecimalCalculatorUI";

import SquareRootCalculatorUI
  from "../components/calculators/SquareRootCalculatorUI";

import PowerCalculatorUI
  from "../components/calculators/PowerCalculatorUI";

import DateDifferenceCalculatorUI
  from "../components/calculators/DateDifferenceCalculatorUI";

import CalorieCalculatorUI
  from "../components/calculators/CalorieCalculatorUI";

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

    case "simple-interest":
      return <SimpleInterestCalculatorUI />

    case "compound-interest":
      return <CompoundInterestCalculatorUI />

    case "sip":
      return <SipCalculatorUI />

    case "fd":
      return <FdCalculatorUI />

    case "rd":
      return <RdCalculatorUI />

    case "loan":
      return <LoanCalculatorUI />

    case "salary":
      return <SalaryCalculatorUI />

    case "fraction":
      return <FractionCalculatorUI />

    case "gcd-lcm":
      return <GcdLcmCalculatorUI />;

    case "decimal":
      return <DecimalCalculatorUI />;

    case "square-root":
      return <SquareRootCalculatorUI />;

    case "power":
      return <PowerCalculatorUI />;

    case "date-difference":
      return <DateDifferenceCalculatorUI />;

    case "calorie":
      return <CalorieCalculatorUI />;
  
  
  
  


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
    <AdSlot className="ad-top" />

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

  <AdSlot className="ad-middle" />

  {calculator.faqs?.length > 0 && (
    <FaqSection
      faqs={calculator.faqs}
    />
  )}

  <RelatedCalculators
  currentCalculator={calculator.slug}
/>

<AdSlot className="ad-middle" />
</CalculatorLayout>
    </>
  );
}