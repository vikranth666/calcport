import { Link } from "react-router-dom";

import { calculatorsConfig } from "../config/calculatorsConfig";

export default function RelatedCalculators({
  currentCalculator,
}) {
  const current =
    calculatorsConfig.find(
      (calculator) =>
        calculator.slug === currentCalculator
    );

  if (!current) {
    return null;
  }

  // 1. Same category calculators
  const sameCategory =
    calculatorsConfig.filter(
      (calculator) =>
        calculator.slug !== current.slug &&
        calculator.category === current.category
    );

  // 2. Popular calculators from other categories
  const popular =
    calculatorsConfig.filter(
      (calculator) =>
        calculator.slug !== current.slug &&
        calculator.popular &&
        calculator.category !== current.category
    );

  // 3. Any remaining calculators
  const others =
    calculatorsConfig.filter(
      (calculator) =>
        calculator.slug !== current.slug
    );

  // Combine without duplicates
  const related = [
    ...sameCategory,
    ...popular,
    ...others,
  ].filter(
    (calculator, index, array) =>
      array.findIndex(
        (item) => item.id === calculator.id
      ) === index
  ).slice(0, 3);

  if (!related.length) {
    return null;
  }

  return (
    <section className="related-section">

      <div className="section-header">
        <h2>Related Calculators</h2>

        <p>
          More useful calculators you may like.
        </p>
      </div>

      <div className="related-grid">

        {related.map((calculator) => (

          <Link
            key={calculator.id}
            to={`/calculator/${calculator.slug}`}
            className="related-card"
          >

            <span className="related-icon">
              {calculator.icon}
            </span>

            <div className="related-content">

              <h3>
                {calculator.title}
              </h3>

              <p>
                {calculator.description}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}