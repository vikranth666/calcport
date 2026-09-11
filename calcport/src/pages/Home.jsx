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

      <CalculatorSection />

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

      {/* WHY CALCPORT */}

      <section className="why-calcport-section">
        <div className="section-header">
          <h2>Why Use CalcPort?</h2>

          <p>
            Simple tools designed to help you calculate
            everyday numbers quickly and easily.
          </p>
        </div>

        <div className="why-calcport-grid">

          <div className="why-calcport-card">
            <div className="why-calcport-icon">
              ⚡
            </div>

            <h3>Fast & Simple</h3>

            <p>
              Get calculations quickly without complicated
              steps or unnecessary distractions.
            </p>
          </div>

          <div className="why-calcport-card">
            <div className="why-calcport-icon">
              📱
            </div>

            <h3>Mobile Friendly</h3>

            <p>
              Use CalcPort comfortably on your phone,
              tablet or desktop wherever you are.
            </p>
          </div>

          <div className="why-calcport-card">
            <div className="why-calcport-icon">
              🧮
            </div>

            <h3>Useful Calculators</h3>

            <p>
              Find calculators for finance, health,
              mathematics and everyday needs.
            </p>
          </div>

          <div className="why-calcport-card">
            <div className="why-calcport-icon">
              🆓
            </div>

            <h3>Free to Use</h3>

            <p>
              Access CalcPort calculators without
              complicated sign-ups or subscriptions.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}

      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>

          <p>
            Quick answers about using CalcPort.
          </p>
        </div>

        <div className="faq-list">

          <details>
            <summary>
              Are CalcPort calculators free to use?
            </summary>

            <p>
              Yes. CalcPort provides free calculators
              for everyday finance, health, math and
              other common calculations.
            </p>
          </details>

          <details>
            <summary>
              Can I use CalcPort on my mobile phone?
            </summary>

            <p>
              Yes. CalcPort is designed to work across
              phones, tablets and desktop devices.
            </p>
          </details>

          <details>
            <summary>
              What types of calculators are available?
            </summary>

            <p>
              CalcPort includes calculators for finance,
              health, mathematics, conversions and other
              everyday needs.
            </p>
          </details>

          <details>
            <summary>
              Do I need to create an account?
            </summary>

            <p>
              No account is required to use the calculators
              on CalcPort.
            </p>
          </details>

        </div>
      </section>

      {/* FOOTER */}

      <Footer />

    </>
  );
}