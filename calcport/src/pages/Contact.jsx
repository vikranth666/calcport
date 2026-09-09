import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        <div className="legal-container">
          <h1>Contact Us</h1>

          <p>
            We'd love to hear from you. If you have a question, suggestion,
            feedback, or notice an issue with one of our calculators, you
            can contact the CalcPort team.
          </p>

          <h2>Get in Touch</h2>

          <p>
            For general questions, calculator feedback, corrections, or
            other inquiries, please email us at:
          </p>

          <p>
            <strong>calcport.contact@gmail.com</strong>
          </p>

          <h2>Calculator Feedback</h2>

          <p>
            If you find an incorrect calculation, unexpected result, broken
            link, or other technical issue, please include the calculator
            name and a brief description of the problem.
          </p>

          <h2>Business & Partnership Inquiries</h2>

          <p>
            For business, advertising, partnership, or other professional
            inquiries, please contact us using the email address above.
          </p>

          <h2>Response Time</h2>

          <p>
            We will try to respond to legitimate inquiries as soon as
            reasonably possible.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}