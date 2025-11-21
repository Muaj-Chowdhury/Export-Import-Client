import React from "react";
import { useLoaderData, useNavigation } from "react-router";
import Loading from "./Loading";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const products = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  if(loading){
    <Loading></Loading>
  }
  return <div className="bg-linear-to-br from-[#e3f2fd] via-[#e8f5ff] to-[#ffffff]">
        <div className="text-center text-3xl  pt-10 font-bold text-[#023E8A]">
        All Products
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 w-11/12 mx-auto ">
        
        {/* ---------------- REAL PRODUCT CARDS ---------------- */}
        {!loading &&
          products?.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
      </div>
      </div>;
};

export default AllProducts;
