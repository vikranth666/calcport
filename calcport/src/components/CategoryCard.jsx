import { Link } from "react-router-dom";

export default function CategoryCard({
  category,
}) {
  return (
    <Link
      to={`/calculators?category=${category.name}`}
      className="category-card"
    >
      <div className="category-icon">
        {category.icon}
      </div>

      <h3>{category.name}</h3>

      <p>
        {category.description}
      </p>
    </Link>
  );
}