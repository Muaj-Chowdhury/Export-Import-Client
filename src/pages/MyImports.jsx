import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyImports = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(products);


  // Fetch My Imports

  useEffect(() => {
    fetch(`http://localhost:3000/myImports?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[0])
        setProducts(data);
        setLoading(false);
      });
  }, [user, setProducts]);


  // Delete Imported Item

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myImports/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              console.log("deleted");
              Swal.fire({
                title: "Deleted!",
                text: "Your import has been deleted.",
                icon: "success",
              });

              // remove from ui
            setProducts((prev) => prev.filter((p) => p._id !== id))
            }
          });
      }
    });
    

    if (loading) {
      return (
        <div className="text-center text-xl font-bold py-20">Loading...</div>
      );
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-[#e0eafc] to-[#cfdef3] p-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        My Imported Products
      </h1>

      {products.length === 0 && (
        <p className="text-center text-xl font-semibold text-gray-700">
          You haven't imported any products yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/40"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-2xl h-56 w-full object-cover shadow-md"
            />

            <h2 className="text-2xl font-bold mt-4 text-gray-900">
              {product.name}
            </h2>

            <p className="mt-2 text-gray-700 font-semibold">
              💰 Price:{" "}
              <span className="font-bold text-gray-900">${product.price}</span>
            </p>

            <p className="text-gray-700 font-semibold">
              ⭐ Rating:{" "}
              <span className="font-bold text-gray-900">{product.rating}</span>
            </p>

            <p className="text-gray-700 font-semibold">
              🌍 Origin:{" "}
              <span className="font-bold text-gray-900">
                {product.originCountry}
              </span>
            </p>

            <p className="text-gray-700 font-semibold">
              📦 Imported Quantity:{" "}
              <span className="font-bold text-gray-900">
                {product.importedQuantity}
              </span>
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-col gap-3">
              <Link
                to={`/productDetails/${product.productId}`}
                className="py-3 text-center font-bold text-white rounded-xl
                bg-linear-to-r bg-linear-to-r from-[#023E8A] to-[#48CAE4] shadow-lg hover:scale-105 transition"
              >
                See Details
              </Link>

              <button
                onClick={() => handleRemove(product._id)}
                className="py-3 font-bold text-white rounded-xl bg-red-500 shadow-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyImports;
