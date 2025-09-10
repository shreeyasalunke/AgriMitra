import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left space-y-6 md:space-y-0">
          
          {/* Logo / Brand */}
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-green-400 transition-colors">
              AgriMitra
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <Link to="/" className="hover:text-green-400 transition-colors">
              Home
            </Link>
            <Link to="/cart" className="hover:text-green-400 transition-colors">
              Cart
            </Link>
            <Link to="/tools" className="hover:text-green-400 transition-colors">
              Tools
            </Link>
            {/* <Link to="/toolown" className="hover:text-green-400 transition-colors">
              Toolowner
            </Link> */}
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} AgriMitra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
