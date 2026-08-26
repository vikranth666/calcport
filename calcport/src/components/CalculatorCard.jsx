import { Link } from "react-router-dom";

export default function CalculatorCard({ calculator }) {
  return (
    <Link to={calculator.path} className="card-link">
      <div className="calculator-card">
        <h3>{calculator.title}</h3>

        <p>{calculator.description}</p>

        <span>{calculator.category}</span>
      </div>
    </Link>
  );
}
