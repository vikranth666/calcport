import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Calculators from "../pages/Calculators";
import DynamicCalculator from "../pages/DynamicCalculator";
import NotFound from "../pages/NotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import Disclaimer from "../pages/Disclaimer";
import Contact from "../pages/Contact";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/calculators"
          element={<Calculators />}
        />

        <Route
          path="/calculator/:slug"
          element={<DynamicCalculator />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/disclaimer" element={<Disclaimer />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}