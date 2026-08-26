import { useEffect, useState }
from "react";

export default function ThemeToggle() {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add("dark");

    } else {

      document.body.classList.remove("dark");
    }

  }, [darkMode]);

  return (
    <button
      className="theme-toggle"
      onClick={() =>
        setDarkMode(!darkMode)
      }
    >

      {darkMode ? "☀️" : "🌙"}

    </button>
  );
}