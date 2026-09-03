import { Link } from "react-router-dom";

export default function CalculatorCard({ calculator }) {
  return (
    <Link
      to={`/calculator/${calculator.slug}`}
      className="card-link"
    >
      <article className="calculator-card">

        <div className="calculator-icon">
          {calculator.icon}
        </div>

        <h3>{calculator.title}</h3>

        <p>{calculator.description}</p>

        <span>{calculator.category}</span>

      </article>
    </Link>
  );
}