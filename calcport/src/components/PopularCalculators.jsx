import CalculatorCard from "./CalculatorCard";
import { calculatorsConfig } from "../config/calculatorsConfig";

export default function PopularCalculators() {
  const popular = calculatorsConfig.filter(
    (calculator) => calculator.popular
  );

  return (
    <section className="calculator-section">
      <div className="section-header">
        <h2>Popular Calculators</h2>

        <p>
          Quick access to our most useful
          calculators.
        </p>
      </div>

      <div className="calculator-grid">
        {popular.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            calculator={calculator}
          />
        ))}
      </div>
    </section>
  );
}