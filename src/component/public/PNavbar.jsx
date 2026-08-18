import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";

const PNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            {/* Replace this with the company's actual logo */}
            <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                T
              </span>
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Tema Foods
              </h1>

              <p className="text-xs text-gray-500">
                Quality Food Products
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition"
            >
              About
            </Link>

            <Link
              to="/products"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition"
            >
              Products
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition"
            >
              Contact
            </Link>

          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center">

            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              <LogIn size={17} />

              Staff Login
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                About
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Products
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Contact
              </Link>

              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium"
              >
                <LogIn size={17} />

                Staff Login
              </Link>

            </div>

          </div>
        )}

      </nav>
    </header>
  );
};

export default PNavbar;