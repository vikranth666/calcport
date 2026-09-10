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

import StatisticsCalculatorUI
  from "../components/calculators/StatisticsCalculatorUI";

import UnitConverterUI
  from "../components/calculators/UnitConverterUI";

import ScientificCalculatorUI 
  from "../components/calculators/ScientificCalculatorUI";

import TimeDurationUI
  from "../components/calculators/TimeDurationUI";

import BmrCalculatorUI
  from "../components/calculators/BmrCalculatorUI"

import IdealWeightCalculatorUI 
  from "../components/calculators/IdealWeightCalculatorUI";

import WaterIntakeCalculatorUI
  from "../components/calculators/WaterIntakeCalculatorUI";

import PregnancyDueDateCalculatorUI
  from "../components/calculators/PregnancyDueDateCalculatorUI";

import PregnancyWeekCalculatorUI
  from "../components/calculators/PregnancyWeekCalculatorUI";

import OvulationCalculatorUI
  from "../components/calculators/OvulationCalculatorUI";

import HeartRateCalculatorUI
  from "../components/calculators/HeartRateCalculatorUI";

import BodySurfaceAreaCalculatorUI
  from "../components/calculators/BodySurfaceAreaCalculatorUI";

import CurrencyConverterUI
  from "../components/calculators/CurrencyConverterUI";

import TipCalculatorUI
  from "../components/calculators/TipCalculatorUI";

import FuelCostCalculatorUI
  from "../components/calculators/FuelCostCalculatorUI";

import ElectricityBillCalculatorUI
  from "../components/calculators/ElectricityBillCalculatorUI";

import TaxCalculatorUI 
  from "../components/calculators/TaxCalculatorUI";

import MapCalculatorUI
  from "../components/calculators/MapCalculatorUI";

import GcsCalculatorUI
  from "../components/calculators/GcsCalculatorUI";

import AnionGapCalculatorUI
  from "../components/calculators/AnionGapCalculatorUI";

import MedicalUnitConverterUI
  from "../components/calculators/MedicalUnitConverterUI";

import QtcCalculatorUI
  from "../components/calculators/QtcCalculatorUI";

import CorrectedCalciumCalculatorUI
  from "../components/calculators/CorrectedCalciumCalculatorUI";

import SerumOsmolalityCalculatorUI
  from "../components/calculators/SerumOsmolalityCalculatorUI";

import AbgCalculatorUI
  from "../components/calculators/AbgCalculatorUI";

import HraCalculatorUI
  from "../components/calculators/HraCalculatorUI";

import PfCalculatorUI
  from "../components/calculators/PfCalculatorUI";

import GratuityCalculatorUI
  from "../components/calculators/GratuityCalculatorUI";

import PpfCalculatorUI
  from "../components/calculators/PpfCalculatorUI";

import NpsCalculatorUI
  from "../components/calculators/NpsCalculatorUI";

import GoldLoanCalculatorUI
  from "../components/calculators/GoldLoanCalculatorUI";

import GpaCgpaCalculatorUI
  from "../components/calculators/GpaCgpaCalculatorUI";

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

    case "statistics":
      return <StatisticsCalculatorUI />;

    case "unit-converter":
      return <UnitConverterUI />;

    case "scientific-calculator":
        return <ScientificCalculatorUI />

    case "time-duration":
        return <TimeDurationUI />;

    case "bmr":
        return <BmrCalculatorUI />;

    case "ideal-weight":
        return <IdealWeightCalculatorUI/>

    case "water-intake":
        return <WaterIntakeCalculatorUI />;

    case "pregnancy-due-date":
        return <PregnancyDueDateCalculatorUI />;

    case "pregnancy-week":
        return <PregnancyWeekCalculatorUI />;

    case "ovulation":
        return <OvulationCalculatorUI />;

    case "heart-rate":
        return <HeartRateCalculatorUI />;

    case "body-surface-area":
        return <BodySurfaceAreaCalculatorUI />;

    case "currency-converter":
        return <CurrencyConverterUI />;

    case "tip-calculator":
        return <TipCalculatorUI />;

    case "fuel-cost-calculator":
        return <FuelCostCalculatorUI />;

    case "electricity-bill-calculator":
        return <ElectricityBillCalculatorUI />;

    case "tax-calculator":
        return <TaxCalculatorUI />

    case "map":
        return <MapCalculatorUI />;

    case "gcs":
        return <GcsCalculatorUI />;

    case "anion-gap":
        return <AnionGapCalculatorUI />;

    case "medical-unit-converter":
        return <MedicalUnitConverterUI />;

    case "qtc":
        return <QtcCalculatorUI />;

    case "corrected-calcium":
        return <CorrectedCalciumCalculatorUI />;

    case "serum-osmolality":
        return <SerumOsmolalityCalculatorUI />;

    case "abg":
        return <AbgCalculatorUI />;

    case "hra":
        return <HraCalculatorUI />;

    case "pf":
        return <PfCalculatorUI />;

    case "gratuity":
        return <GratuityCalculatorUI />;

    case "ppf":
        return <PpfCalculatorUI />;

    case "nps":
        return <NpsCalculatorUI />;

    case "gold-loan":
        return <GoldLoanCalculatorUI />;

    case "gpa-cgpa":
        return <GpaCgpaCalculatorUI />;
  
  


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