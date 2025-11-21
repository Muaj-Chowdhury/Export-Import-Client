import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-linear-to-r from-[#006D77] to-[#152225] text-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold">TradeFlow</h1>
          <p className="text-sm text-white/80">
            Manage, monitor, and grow your global trade operations seamlessly.
            Track shipments, manage products, and import/export with ease.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-yellow-300 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="space-y-2 text-white/90">
            <li><a href="/all-products" className="hover:text-yellow-300 transition">All Products</a></li>
            <li><a href="/my-exports" className="hover:text-yellow-300 transition">My Exports</a></li>
            <li><a href="/my-imports" className="hover:text-yellow-300 transition">My Imports</a></li>
            <li><a href="/add-export" className="hover:text-yellow-300 transition">Add Export</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Resources</h2>
          <ul className="space-y-2 text-white/90">
            <li><a href="#" className="hover:text-yellow-300 transition">Documentation</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Support</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">API Reference</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Contact</h2>
          <p className="text-white/90 text-sm">
            Email: <a href="mailto:support@tradeflow.com" className="hover:text-yellow-300 transition">support@tradeflow.com</a>
          </p>
          <p className="text-white/90 text-sm">Phone: +123 456 7890</p>
          <p className="text-white/90 text-sm">123 TradeFlow St, Global City</p>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-6 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} TradeFlow. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
