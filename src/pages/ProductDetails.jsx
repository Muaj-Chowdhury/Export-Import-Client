import React, { useContext, useRef, useState } from "react";
import { useLoaderData } from "react-router";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";
const ProductDetails = () => {
  useTitle("ProductDetails");
  const { user } = useContext(AuthContext);
  // console.log(user.displayName)
  const result = useLoaderData();
  const [product, setProduct] = useState(result.result[0]);
  const [loading, setLoading] = useState(true);
  const [importQty, setImportQty] = useState("");

  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.showModal();
  };

  const { image, name, price, rating, originCountry } = product;
  const { displayName, email } = user;

  const handleImport = (e) => {
    e.preventDefault();

    const importedQuantity = importQty;

    // // ❌ Empty, NaN, or not a number at all
    // if (!importedQuantity || isNaN(importedQuantity)) {
    //   alert("Please enter a valid number!");
    //   return;
    // }

    // ❌ More than available stock
    if (importedQuantity > product.availableQuantity) {
      alert("Quantity exceeds available stock!");
      return;
    }
    const newProduct = {
      productId: product._id,
      image,
      name,
      price,
      rating,
      originCountry,
      importedQuantity,
      displayName,
      email,
    };

    console.log(newProduct);
    // API call to import product and decrement quantity

    fetch("https://export-import-server-pi.vercel.app/imports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.importResult.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Imported Successfully!",
            text: `${newProduct.name} has been Imported.`,
            timer: 1500,
            showConfirmButton: false,
          });
        }

        setProduct((prev) => ({
          ...prev,
          availableQuantity: prev.availableQuantity - importedQuantity,
        }));
        modalRef.current.close();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#dfe9f3] to-[#ffffff] p-6 md:p-10">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12
                   border border-white/40 flex flex-col md:flex-row gap-10"
      >
        {/* PRODUCT IMAGE */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="md:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[350px] md:h-[420px] object-cover"
          />
        </motion.div>

        {/* PRODUCT DETAILS */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {product.title}
            </h1>

            <p className="mt-3 text-lg font-semibold text-gray-700">
              🌍 Origin:
              <span className="font-bold text-gray-900"> {product.origin}</span>
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-700">
              ⭐ Rating:
              <span className="font-bold text-gray-900"> {product.rating}</span>
            </p>

            <p className="mt-2 text-xl font-bold text-purple-600">
              💰 Price: ${product.price}
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-700">
              📦 Available Quantity:
              <span className="font-bold text-gray-900">
                {" "}
                {product.availableQuantity}
              </span>
            </p>
          </div>

          {/* Import Button */}
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 py-4 w-full text-white font-bold rounded-2xl text-lg 
                       bg-linear-to-r from-[#6a11cb] to-[#2575fc] shadow-xl"
          >
            Import Now
          </motion.button>
        </div>
      </motion.div>

      {/* Modal Box */}

      <dialog
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      >
        <div className="modal-box">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-xl shadow-2xl p-8 rounded-3xl w-[90%] max-w-md border border-white/30"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5 text-center">
              Import Product
            </h2>
            <p className="font-semibold text-gray-700 text-center mb-4">
              Available:{" "}
              <span className="font-bold text-gray-900">
                {product.availableQuantity}
              </span>
            </p>

            <input
              type="number"
              min={1}
              step={1}
              //   max={product.availableQuantity}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key))
                  e.preventDefault(); // block weird chars
              }}
              value={importQty}
              onChange={(e) => {
                setImportQty(e.target.value);
              }}
              className="w-full p-4 rounded-xl border bg-white shadow-inner 
                     font-bold text-gray-900 outline-none"
            />

            {/* import Button */}
            <button
              disabled={importQty > product.availableQuantity}
              onClick={handleImport}
              className={`mt-6 w-full py-4 rounded-2xl font-bold text-lg text-white 
            shadow-lg transition-all duration-300
            ${
              importQty > product.availableQuantity
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-[#6a11cb] to-[#2575fc] hover:scale-105"
            }
          `}
            >
              Submit
            </button>

            {/* Close */}
            <button
              onClick={() => modalRef.current.close()}
              className="mt-4 text-gray-700 font-bold w-full hover:text-red-600"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      </dialog>

      {/* Modal box close */}
    </div>
  );
};

export default ProductDetails;
