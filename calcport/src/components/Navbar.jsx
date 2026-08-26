import { useState } from "react";

import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="navbar">

      <div className="logo">
        CalcPort
      </div>

      {/* DESKTOP LINKS */}

      <div className="nav-links desktop-nav">

        <Link to="/">Home</Link>

        <Link to="/calculators">
          Calculators
        </Link>

        <Link to="/about">
          About
        </Link>

      </div>

      <ThemeToggle />
      
      {/* MOBILE ICON */}

      <div
        className="mobile-menu-icon"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="mobile-menu">

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <Link
            to="/calculators"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Calculators
          </Link>

          <Link
            to="/about"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            About
          </Link>

        </div>

      )}

    </nav>
  );
}