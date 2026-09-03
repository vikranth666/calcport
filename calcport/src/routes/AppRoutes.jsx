import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Calculators from "../pages/Calculators";
import DynamicCalculator from "../pages/DynamicCalculator";
import NotFound from "../pages/NotFound";

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
      </Routes>
    </BrowserRouter>
  );
}