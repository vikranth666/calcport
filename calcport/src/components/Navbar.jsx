import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        CalcPort
      </Link>

      <div className="nav-links desktop-nav">
        <Link to="/">Home</Link>

        <Link to="/calculators">
          Calculators
        </Link>

        <Link to="/about">
          About
        </Link>

        <ThemeToggle />
      </div>

      <div className="mobile-nav-actions">
        <ThemeToggle />

        <button
          type="button"
          className="mobile-menu-icon"
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/calculators"
            onClick={closeMenu}
          >
            Calculators
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}