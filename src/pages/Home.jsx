import React from "react";
import Banner from "../components/Banner";
import { useLoaderData, useNavigation } from "react-router";
import ProductCard from "../components/ProductCard";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  const products = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <div>
      <Banner />

      <div className="bg-[linear-gradient(135deg,#E0F7FF_0%,#C2EAFF_50%,#90E0EF_100%)]">
        <div className="text-center text-3xl  pt-10 font-bold text-[#023E8A]">
        Latest Products
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 w-11/12 mx-auto ">
        
        {/* ---------------- SKELETON LOADING ---------------- */}
        {loading &&
          [...Array(6)].map((_,i) => (
            <div
              key={i}
              className="card bg-white shadow-md rounded-xl border p-4"
            >
              <div className="h-40 skeleton rounded-xl w-full"></div>
              <div className="mt-4 space-y-3">
                <div className="h-4 w-1/2 skeleton"></div>
                <div className="h-4 w-1/3 skeleton"></div>
                <div className="h-4 w-2/3 skeleton"></div>
                <div className="h-4 w-1/4 skeleton"></div>
                <div className="h-10 w-full skeleton rounded-lg"></div>
              </div>
            </div>
          ))}

        {/* ---------------- REAL PRODUCT CARDS ---------------- */}
        {!loading &&
          products?.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
      </div>
      </div>
    </div>
  );
};

export default Home;

