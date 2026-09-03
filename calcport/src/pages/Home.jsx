import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* import SearchBar from "../components/SearchBar"; */
/* import CategorySection from "../components/CategorySection"; */
import CalculatorSection from "../components/CalculatorSection";

import CategoryCard
  from "../components/CategoryCard";

import { categoriesConfig }
  from "../config/categories";

import CalculatorSearch
  from "../components/CalculatorSearch";

export default function Home() {

  const [search, setSearch] = useState("");

  return (
    <>

      <Navbar />

      {/* HERO SECTION */}

      <section className="hero">
  <h1>
    Free Calculators for Everyday Life
  </h1>

  <p>
    Fast, simple and easy-to-use calculators
    for finance, health, math and more.
  </p>

  <CalculatorSearch />
</section>

      {/* CALCULATORS */}

      <CalculatorSection search={search} />

       {/* CATEGORY SECTION */}

      <section className="category-section">
  <div className="section-header">
    <h2>Browse by Category</h2>

    <p>
      Find the right calculator for your needs.
    </p>
  </div>

  <div className="category-grid">
    {categoriesConfig.map((category) => (
      <CategoryCard
        key={category.id}
        category={category}
      />
    ))}
  </div>
</section>

      {/* FOOTER */}

      <Footer />

    </>
  );
}