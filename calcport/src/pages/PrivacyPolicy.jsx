import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        <div className="legal-container">
          <h1>Privacy Policy</h1>

          <p className="legal-updated">
            Last updated: September 9, 2026
          </p>

          <p>
            Welcome to CalcPort. Your privacy is important to us. This
            Privacy Policy explains how information may be collected, used,
            and protected when you use our website and calculators.
          </p>

          <h2>1. Information We Collect</h2>

          <p>
            CalcPort is designed to provide calculators without requiring
            users to create an account. We generally do not ask you to
            provide personal information to use our calculators.
          </p>

          <p>
            However, certain technical information may be automatically
            collected when you visit the website, such as your IP address,
            browser type, device information, pages visited, and general
            usage information.
          </p>

          <h2>2. How We Use Information</h2>

          <p>
            Information may be used to operate, maintain, improve, and
            secure CalcPort, understand how visitors use the website, and
            identify technical problems.
          </p>

          <h2>3. Calculator Data</h2>

          <p>
            Calculator inputs are used to perform calculations and display
            results. CalcPort does not require you to submit calculator
            results as personal records.
          </p>

          <p>
            You should avoid entering sensitive personal information into
            any calculator unless it is necessary for the calculation.
          </p>

          <h2>4. Cookies</h2>

          <p>
            CalcPort or third-party services used on the website may use
            cookies or similar technologies to provide functionality,
            understand website usage, or display relevant advertising.
          </p>

          <h2>5. Advertising</h2>

          <p>
            We may use third-party advertising services, including Google
            AdSense, to display advertisements on CalcPort.
          </p>

          <p>
            Third-party advertising providers may use cookies or similar
            technologies to serve advertisements based on a user's visits
            to this and other websites.
          </p>

          <h2>6. Third-Party Services</h2>

          <p>
            CalcPort may use third-party services such as analytics,
            advertising, APIs, hosting providers, and other services
            necessary to operate the website.
          </p>

          <p>
            These services may process information according to their own
            privacy policies.
          </p>

          <h2>7. External Links</h2>

          <p>
            CalcPort may contain links to external websites. We are not
            responsible for the privacy practices or content of external
            websites.
          </p>

          <h2>8. Data Security</h2>

          <p>
            We take reasonable measures to help protect information
            associated with the operation of CalcPort. However, no method
            of transmission or electronic storage can be guaranteed to be
            completely secure.
          </p>

          <h2>9. Children's Privacy</h2>

          <p>
            CalcPort is not intended to knowingly collect personal
            information from children. If you believe that a child has
            provided personal information to us, please contact us so that
            appropriate action can be taken.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time. Any
            changes will be posted on this page with an updated revision
            date.
          </p>

          <h2>11. Contact Us</h2>

          <p>
            If you have questions about this Privacy Policy or CalcPort's
            privacy practices, please contact us through the Contact Us
            page.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}