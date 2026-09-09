import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Disclaimer() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        <div className="legal-container">
          <h1>Disclaimer</h1>

          <p className="legal-updated">
            Last updated: September 9, 2026
          </p>

          <p>
            The information and calculator results provided by CalcPort
            are intended for general informational and educational
            purposes only.
          </p>

          <h2>1. General Information</h2>

          <p>
            CalcPort provides online calculators to help users perform
            common mathematical, financial, health, date, and other
            calculations.
          </p>

          <p>
            While we make reasonable efforts to provide useful and
            accurate results, we do not guarantee that the information or
            calculations are always complete, accurate, or error-free.
          </p>

          <h2>2. Financial Disclaimer</h2>

          <p>
            Financial calculators and related information are provided for
            general informational purposes only. They should not be
            considered financial, investment, banking, accounting, or tax
            advice.
          </p>

          <p>
            Actual financial results may vary depending on interest rates,
            fees, taxes, lender policies, investment conditions, and other
            factors.
          </p>

          <h2>3. Health Disclaimer</h2>

          <p>
            Health-related calculators and information on CalcPort are not
            intended to diagnose, treat, cure, or prevent any disease or
            medical condition.
          </p>

          <p>
            Results such as BMI, BMR, calorie estimates, body measurements,
            heart-rate information, or other health calculations should
            not be treated as medical advice.
          </p>

          <p>
            Consult a qualified healthcare professional for medical
            questions or decisions.
          </p>

          <h2>4. Calculator Results</h2>

          <p>
            Calculator results are estimates based on the information
            entered by the user and the formulas implemented by CalcPort.
          </p>

          <p>
            Users are responsible for reviewing and verifying results
            before relying on them for important decisions.
          </p>

          <h2>5. No Guarantee</h2>

          <p>
            CalcPort does not guarantee that the website, calculators, or
            information will always be available, accurate, complete,
            current, or suitable for a particular purpose.
          </p>

          <h2>6. External Websites</h2>

          <p>
            CalcPort may contain links to third-party websites or services.
            We are not responsible for the content, accuracy, availability,
            or policies of those external websites.
          </p>

          <h2>7. Changes to This Disclaimer</h2>

          <p>
            We may update this Disclaimer from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>

          <h2>8. Contact</h2>

          <p>
            If you have questions about this Disclaimer, please contact us
            through the Contact Us page.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}