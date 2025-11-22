import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import useTitle from "../hooks/useTitle";
const MyExports = () => {
  useTitle("MyExports");
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  //   console.log(products);
  const [selected, setSelected] = useState(null);
  console.log(selected);
  const updateModalRef = useRef();

  useEffect(() => {
    fetch(
      `https://export-import-server-pi.vercel.app/myExports?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [user.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Call API
        const res = await fetch(
          `https://export-import-server-pi.vercel.app/products/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
          // Remove from UI
          setProducts((prev) => prev.filter((p) => p._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "The product has been removed successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire("Error", "Failed to delete product.", "error");
        }
      }
    });
  };

  const handleUpdate = (product) => {
    setSelected(product);
    // Use setTimeout to ensure state is updated before showing modal
    setTimeout(() => {
      updateModalRef.current.showModal();
    }, 0);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      price: Number(form.price.value),
      originCountry: form.originCountry.value,
      rating: Number(form.rating.value),
      availableQuantity: Number(form.availableQuantity.value),
      image: form.image.value,
    };

    // console.log(updated)

    try {
      //   Show loading state
      Swal.fire({
        title: "Updating Product...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch(
        `https://export-import-server-pi.vercel.app/products/${selected._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        setSelected(null);
        Swal.fire({
          icon: "success",
          title: "Updated Successfully!",
          text: `${updated.name} has been updated.`,
          timer: 1500,
          showConfirmButton: false,
        });

        //   Update ui

        setProducts((prev) =>
          prev.map((p) => (p._id === selected._id ? { ...p, ...updated } : p))
        );

        // Close modal

        updateModalRef.current.close();
      } else {
        Swal.fire("No Changes", "Nothing was updated.", "info");
        setSelected(null);
        updateModalRef.current.close();
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    }
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-linear-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen">
      {products.map((product) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="backdrop-blur-xl rounded-2xl bg-white/80 border border-white/10
                 p-5 shadow-xl hover:shadow-2xl hover:-translate-y-1 
                 transition-all duration-300"
        >
          <div className="rounded-xl overflow-hidden">
            <img src={product.image} className="h-48 w-full object-cover" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900 tracking-wide">
            {product.name}
          </h2>

          <div className="mt-2 space-y-1 text-gray-300 text-sm">
            <p className="mt-2 text-gray-700 font-semibold">
              Price:{" "}
              <span className="font-bold text-gray-900">${product.price}</span>
            </p>

            <p className="text-gray-700 font-semibold">
              Rating:{" "}
              <span className="font-bold text-gray-900">{product.rating}</span>
            </p>

            <p className="text-gray-700 font-semibold">
              Origin:{" "}
              <span className="font-bold text-gray-900">
                {product.originCountry}
              </span>
            </p>
            <p className="text-gray-700 font-semibold">
              Available :{" "}
              <span className="font-bold text-gray-900">
                {product.availableQuantity}
              </span>
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(product._id)}
              className="flex-1 py-2 rounded-xl font-semibold
                     bg-linear-to-r from-red-500 to-red-700
                     text-white shadow-lg hover:shadow-red-500/40 
                     hover:scale-[1.03] transition-all duration-300"
            >
              Delete
            </button>

            {/* UPDATE BUTTON */}
            <button
              onClick={() => handleUpdate(product)}
              className="flex-1 py-2 rounded-xl font-semibold
                     bg-linear-to-r from-[#023E8A] to-[#48CAE4]
                     text-white shadow-lg hover:shadow-blue-500/40
                     hover:scale-[1.03] transition-all duration-300"
            >
              Update
            </button>
          </div>
        </motion.div>
      ))}

      {/* UPDATE MODAL */}
      <dialog
        ref={updateModalRef}
        className="modal"
        key={selected?._id || "empty-form"}
      >
        <div className="modal-box bg-[#0f172a] text-white border border-white/10">
          <h3 className="font-bold text-2xl mb-4 text-center">
            Update Product
          </h3>

          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <label className="label">Name</label>
            <input
              defaultValue={selected?.name}
              name="name"
              className="input input-bordered w-full bg-[#1e293b] text-white"
            />
            <label className="label">Price</label>
            <input
              defaultValue={selected?.price}
              name="price"
              className="input input-bordered w-full bg-[#1e293b] text-white"
            />
            <label className="label">Origin Country</label>
            <input
              defaultValue={selected?.originCountry}
              name="originCountry"
              className="input input-bordered w-full bg-[#1e293b] text-white"
            />
            <label className="label">Rating</label>
            <input
              defaultValue={selected?.rating}
              name="rating"
              className="input input-bordered w-full bg-[#1e293b] text-white"
            />
            <label className="label">Available Quantity</label>
            <input
              defaultValue={selected?.availableQuantity}
              name="availableQuantity"
              className="input input-bordered w-full bg-[#1e293b] text-white"
            />
            <label className="label">Image</label>
            <input
              defaultValue={selected?.image}
              name="image"
              className="input input-bordered w-full bg-[#1e293b] text-white"
            />

            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-linear-to-r from-green-500 to-green-700 
                       text-white w-full font-semibold tracking-wide 
                       hover:shadow-green-500/40 hover:scale-105 
                       transition-all duration-300"
              >
                Submit Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyExports;
