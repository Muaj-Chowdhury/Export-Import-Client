/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router";

const ProductCard = ({ product, index }) => {
  const {
    _id,
    image,
    name,
    price,
    originCountry,
    rating,
    availableQuantity,
  } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.12,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03 }}
      className="rounded-xl shadow-lg bg-linear-to-br from-[#e7f9ff] to-[#ffffff] border border-[#d8f3fc] overflow-hidden"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-56 w-full object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Body */}
      <div className="p-4 text-[#023E8A]">
        <h2 className="font-extrabold text-lg mb-2">{name}</h2>

        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Price:</span> ${price}
          </p>
          <p>
            <span className="font-semibold">Origin:</span> {originCountry}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> ⭐ {rating}
          </p>
          <p>
            <span className="font-semibold">Available:</span> {availableQuantity}
          </p>
        </div>

        {/* Button */}
        <div className="mt-4">
          <Link
            to={`/productDetails/${_id}`}
            className="btn w-full border-none text-white font-semibold rounded-lg"
            style={{
              background: "linear-gradient(90deg, #48CAE4, #023E8A)",
            }}
          >
            See Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
