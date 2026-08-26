import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import SearchBar from "../components/SearchBar";
import CategorySection from "../components/CategorySection";
import CalculatorSection from "../components/CalculatorSection";

export default function Home() {

  const [search, setSearch] = useState("");

  return (
    <>

      <Navbar />

      {/* HERO SECTION */}

      <section className="hero">

        <h1>
          All Your Calculations,
          One Place.
        </h1>

        <p>
          Fast, accurate and free calculators
          for everyday use.
        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </section>

      {/* CATEGORY SECTION */}

      <CategorySection />

      {/* CALCULATORS */}

      <CalculatorSection search={search} />

      {/* FOOTER */}

      <Footer />

    </>
  );
}