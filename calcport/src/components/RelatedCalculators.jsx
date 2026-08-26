import { calculators }  from "../data/Calculators"

import CalculatorCard from "./CalculatorCard";

export default function RelatedCalculators() {

  return (
    <section className="related-section">

      <div className="section-header">

        <h2>
          Related Calculators
        </h2>

      </div>

      <div className="calculator-grid">

        {calculators.slice(0, 3).map((calculator) => (

          <CalculatorCard
            key={calculator.id}
            calculator={calculator}
          />

        ))}

      </div>

    </section>
  );
}