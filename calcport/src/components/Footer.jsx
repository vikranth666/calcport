import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <h2>CalcPort</h2>

          <p>
            Fast and accurate calculators
            for everyday use.
          </p>
        </div>

        <div className="footer-links">

          <div>
            <h4>Quick Links</h4>

            <Link to="/">Home</Link>
            <Link to="/calculators">Calculators</Link>
            <Link to="/about">About</Link>
          </div>

          <div>
            <h4>Legal</h4>

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>

            <Link to="/disclaimer">
              Disclaimer
            </Link>

            <Link to="/contact">
              Contact Us
            </Link>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CalcPort. All rights reserved.
      </div>

    </footer>
  );
}

