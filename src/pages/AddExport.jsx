import React, { useContext, useState } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import useTitle from "../hooks/useTitle";
const AddExport = () => {
  useTitle("AddExport");
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    originCountry: "",
    rating: "",
    availableQuantity: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers for price, rating, and quantity
    if (["price", "rating", "availableQuantity"].includes(name)) {
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
      return;
    }
    if (!form.rating || Number(form.rating) < 1 || Number(form.rating) > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
      return;
    }
    if (!form.availableQuantity || Number(form.availableQuantity) < 1) {
      newErrors.availableQuantity = "Quantity must be at least 1";
      return;
    }
    setErrors(newErrors);

    const productData = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      availableQuantity: Number(form.availableQuantity),
      created_at: new Date(),
      exporterEmail: user.email,
    };

    fetch("https://export-import-server-pi.vercel.app/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "middle",
            icon: "success",
            title: "Your export documents has been accepted",
            showConfirmButton: false,
            timer: 1500,
          });
          // setForm({
          //   name: "",
          //   image: "",
          //   price: "",
          //   originCountry: "",
          //   rating: "",
          //   availableQuantity: "",
          // });
        }
      });
  };

  return (
    <div className="min-h-screen py-10 bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
      >
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Add Export / Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
            />
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <input
              type="number"
              name="price"
              value={form.price}
              min="1"
              step="0.01"
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Origin Country */}
          <div>
            <input
              type="text"
              name="originCountry"
              value={form.originCountry}
              onChange={handleChange}
              placeholder="Origin Country"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
            />
            {errors.originCountry && (
              <p className="text-red-400 text-sm mt-1">
                {errors.originCountry}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <input
              type="number"
              name="rating"
              value={form.rating}
              min="1"
              max="5"
              step="0.1"
              onChange={handleChange}
              placeholder="Rating (1-5)"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
            />
            {errors.rating && (
              <p className="text-red-400 text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Available Quantity */}
          <div>
            <input
              type="number"
              name="availableQuantity"
              value={Number(form.availableQuantity)}
              min="1"
              step="1"
              onChange={handleChange}
              placeholder="Available Quantity"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 outline-none"
            />
            {errors.availableQuantity && (
              <p className="text-red-400 text-sm mt-1">
                {errors.availableQuantity}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-transform 
                 bg-linear-to-r from-[#6a11cb] to-[#2575fc] hover:scale-105
            `}
          >
            Add Export / Product
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddExport;
