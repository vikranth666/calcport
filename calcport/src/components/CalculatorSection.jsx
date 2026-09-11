import { Link } from "react-router-dom";
import { calculatorsConfig } from "../config/calculatorsConfig";

import CalculatorCard
from "./CalculatorCard";

export default function CalculatorSection() {

  return (
    <section className="calculator-section">

      <div className="section-header">

        <h2>
          Popular Calculators
        </h2>

        <p>
          Simple, fast and accurate
          calculators for daily use.
        </p>

      </div>

      <div className="calculator-grid">

        {calculatorsConfig
          .filter((calculator) => calculator.popular === true)
          .slice(0, 8)
          .map((calculator) => (

            <CalculatorCard
              key={calculator.id}
              calculator={calculator}
            />

          ))}

      </div>

      <div className="calculator-section-action">
        <Link to="/calculators">
          View All Calculators →
        </Link>
      </div>

    </section>
  );
}