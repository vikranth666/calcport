import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        <div className="legal-container">
          <h1>About CalcPort</h1>

          <p>
            CalcPort is a free online calculator website designed to make
            everyday calculations simple, fast, and easy to understand.
          </p>

          <h2>What is CalcPort?</h2>

          <p>
            CalcPort brings useful calculators together in one place.
            Whether you need help with finance, health, mathematics,
            conversions, dates, or everyday calculations, our goal is to
            provide a simple tool that gives you a clear result.
          </p>

          <h2>Our Goal</h2>

          <p>
            Our goal is to make calculators accessible to everyone without
            unnecessary complexity. We aim to provide easy-to-use tools
            that work well on both desktop and mobile devices.
          </p>

          <h2>Our Calculators</h2>

          <p>
            CalcPort offers a growing collection of calculators covering
            different areas of everyday life. We regularly improve existing
            calculators and add useful new tools based on what users need.
          </p>

          <h2>Accuracy</h2>

          <p>
            We make reasonable efforts to ensure our calculators provide
            useful and accurate results. However, calculator results should
            be independently verified before being used for important
            financial, medical, legal, or other professional decisions.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have a suggestion, find an issue with a calculator, or
            simply want to get in touch, we'd be happy to hear from you.
          </p>

          <p>
            Email us at{" "}
            <strong>calcport.contact@gmail.com</strong>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}