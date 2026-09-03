import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { calculatorsConfig } from "../config/calculatorsConfig";

export default function CalculatorSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return [];
    }

    return calculatorsConfig
      .filter((calculator) => {
        const searchableText = [
          calculator.title,
          calculator.description,
          calculator.category,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          trimmedQuery
        );
      })
      .slice(0, 8);
  }, [query]);

  return (
    <div className="calculator-search">
      <div className="search-input-wrapper">
        <span className="search-icon">
          🔍
        </span>

        <input
          type="search"
          value={query}
          placeholder="Search calculators..."
          onChange={(event) =>
            setQuery(event.target.value)
          }
          aria-label="Search calculators"
        />

        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {query.trim() && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((calculator) => (
              <Link
                key={calculator.id}
                to={`/calculator/${calculator.slug}`}
                className="search-result"
                onClick={() => setQuery("")}
              >
                <div className="search-result-icon">
                  {calculator.icon}
                </div>

                <div className="search-result-content">
                  <strong>
                    {calculator.title}
                  </strong>

                  <span>
                    {calculator.category}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="search-no-results">
              No calculators found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}