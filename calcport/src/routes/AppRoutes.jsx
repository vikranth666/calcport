import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import GstCalculator from "../pages/calculators/GstCalculator";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gst-calculator" element={<GstCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}