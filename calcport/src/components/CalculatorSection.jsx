import { calculators }
from "../data/Calculators";

import CalculatorCard
from "./CalculatorCard";

export default function CalculatorSection({
  search,
}) {

  const filteredCalculators =
    calculators.filter((calculator) =>
      calculator.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

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

        {filteredCalculators.length > 0 ? (

          filteredCalculators.map((calculator) => (

            <CalculatorCard
              key={calculator.id}
              calculator={calculator}
            />

          ))

        ) : (

          <div className="no-results">

            No calculators found.

          </div>

        )}

      </div>

    </section>
  );
}