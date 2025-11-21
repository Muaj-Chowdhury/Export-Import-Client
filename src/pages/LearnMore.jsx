import React from "react";
import { motion } from "framer-motion";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#006D77] to-[#00B4D8] text-white p-6 md:p-12">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center py-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Empower Your Import & Export Business
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Manage, Monitor & Grow Seamlessly
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          A powerful platform designed to simplify global trade operations. 
          Track shipments, manage documents, and analyze performance in one unified dashboard.
          With TradeFlow, stay ahead in global commerce effortlessly.
        </p>
      </motion.div>

      {/* Detailed Sections */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-3">Seamless Management</h3>
          <p className="text-white/90 leading-relaxed">
            Organize your imports and exports efficiently. Access your product
            listings, shipment details, and document management all in one
            intuitive platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-3">Real-Time Insights</h3>
          <p className="text-white/90 leading-relaxed">
            Track the performance of your global trade operations in real-time. 
            Analyze trends, monitor shipments, and make informed decisions to 
            maximize your business growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-3">Secure & Reliable</h3>
          <p className="text-white/90 leading-relaxed">
            Your data is protected with advanced security protocols. Only authorized 
            users can access sensitive trade information, giving you peace of mind.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-3">Global Reach</h3>
          <p className="text-white/90 leading-relaxed">
            Connect with suppliers and buyers worldwide. Expand your import-export 
            operations seamlessly with TradeFlow’s user-friendly global platform.
          </p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#006D77] font-bold py-4 px-10 rounded-full shadow-xl text-lg"
        >
          Get Started
        </motion.button>
      </div>

    </div>
  );
};

export default LearnMore;
