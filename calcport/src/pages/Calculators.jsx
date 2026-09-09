import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CalculatorCard from "../components/CalculatorCard";

import { calculatorsConfig } from "../config/calculatorsConfig";

export default function Calculators() {
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] =
    useSearchParams();

  // Get category from URL
  const urlCategory =
    searchParams.get("category") || "All";

  const category = urlCategory;

  // Build category list dynamically
  const categories = [
    "All",
    ...new Set(
      calculatorsConfig.map(
        (calculator) => calculator.category
      )
    ),
  ];

  // Filter calculators
  const filteredCalculators = useMemo(() => {
    return calculatorsConfig.filter(
      (calculator) => {
        const searchTerm = search.toLowerCase();

const matchesSearch =
  calculator.title
    .toLowerCase()
    .includes(searchTerm) ||
  calculator.description
    .toLowerCase()
    .includes(searchTerm) ||
  calculator.category
    .toLowerCase()
    .includes(searchTerm);

        const matchesCategory =
          category === "All" ||
          calculator.category ===
            category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );
  }, [search, category]);

  // Change category
  const handleCategoryChange = (
    selectedCategory
  ) => {
    if (selectedCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: selectedCategory,
      });
    }
  };

  return (
    <>
      <Navbar />

      <main className="calculators-page">

        {/* Header */}
        <header className="calculators-header">
          <h1>All Calculators</h1>

          <p>
            Explore our collection of simple,
            fast and useful calculators.
          </p>
        </header>

        {/* Controls */}
        <div className="calculator-controls">

          {/* Search */}
          <input
            type="search"
            placeholder="Search calculators..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            aria-label="Search calculators"
          />

          {/* Categories */}
          <div
            className="category-filters"
            role="group"
            aria-label="Calculator categories"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(item)
                }
                aria-pressed={
                  category === item
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <section
          className="calculator-grid"
          aria-label="Calculator results"
        >
          {filteredCalculators.length > 0 ? (
            filteredCalculators.map(
              (calculator) => (
                <CalculatorCard
                  key={calculator.id}
                  calculator={calculator}
                />
              )
            )
          ) : (
            <div className="no-results">
              <h3>
                No calculators found
              </h3>

              <p>
                Try a different search term
                or category.
              </p>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </>
  );
}

