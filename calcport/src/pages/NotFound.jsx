import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="not-found">
        <h1>404</h1>

        <h2>Page not found</h2>

        <p>
          The page you're looking for doesn't
          exist or may have been moved.
        </p>

        <Link to="/">
          Back to CalcPort
        </Link>
      </main>

      <Footer />
    </>
  );
}