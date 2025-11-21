import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router";
import Loading from "./Loading";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const fetchProducts = useLoaderData();
  const [products , setProducts] = useState(fetchProducts)
  
  const navigation = useNavigation();
  const loading = navigation.state === "loading";


  const handleSearch = (e)=>{
    e.preventDefault()
    const search_text = e.target.search.value
    fetch(`http://localhost:3000/search?search=${search_text}`)
    .then(res=> res.json())
    .then(data=> {
      setProducts(data)
    })
  }

  if (loading) {
    <Loading></Loading>;
  }
  return (
    <div className="bg-linear-to-br from-[#e3f2fd] via-[#e8f5ff] to-[#ffffff]">
      <div className="text-center text-3xl  pt-10 font-bold text-[#023E8A]">
        All Products
      </div>

        <form
          onSubmit={handleSearch}
          className=" mt-5 mb-10 flex gap-2 justify-center"
        >
          <label className="input rounded-full ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input name="search" type="search" placeholder="Search" />
          </label>
          <button className="btn bg-linear-to-r from-[#023E8A] to-[#48CAE4] text-white  rounded-full">
            {loading ? "Searching...." : "Search"}
          </button>
        </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 w-11/12 mx-auto ">
        {/* ---------------- REAL PRODUCT CARDS ---------------- */}
        {!loading &&
          products?.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
