import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import JameyPage from "./pages/JameyPage";
import AboutPage from "./pages/AboutPage";
import HenryPage from "./pages/HenryPage";

const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/jamey" element={<JameyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/henry" element={<HenryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
