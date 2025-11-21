import React from "react";
import { motion } from "framer-motion";
import useTitle from "../hooks/useTitle";

const Support = () => {
    useTitle("Support");
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center"
        >
          Contact & Support
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4 text-lg text-slate-300"
        >
          We're here to help you with your import & export management needs.
        </motion.p>

        {/* Support Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700"
          >
            <h3 className="text-xl font-semibold mb-3">📞 Customer Support</h3>
            <p className="text-slate-300 mb-4">
              Get help with account issues, login problems, or general questions.
            </p>
            <button className="btn bg-linear-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl">
              Call Us
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700"
          >
            <h3 className="text-xl font-semibold mb-3">🚚 Shipment Issues</h3>
            <p className="text-slate-300 mb-4">
              Need help tracking your shipment or resolving logistics issues?
            </p>
            <button className="btn bg-linear-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl">
              Report Issue
            </button>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700"
          >
            <h3 className="text-xl font-semibold mb-3">🤝 Business Partnerships</h3>
            <p className="text-slate-300 mb-4">
              Interested in working with us? Let's grow together.
            </p>
            <button className="btn bg-linear-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl">
              Contact Team
            </button>
          </motion.div>

        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-slate-800 p-10 rounded-2xl shadow-xl border border-slate-700"
        >
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

          <form className="grid gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
            <textarea
              rows="5"
              placeholder="Your Message..."
              className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
            ></textarea>

            <button className="btn bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl text-lg">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
