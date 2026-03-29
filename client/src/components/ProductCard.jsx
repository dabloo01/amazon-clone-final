import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showMsg, setShowMsg] = useState(false);

  const openProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };

  return (
    <div className="relative">
      {showMsg && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded shadow z-10">
          Product added successfully ✅
        </div>
      )}

      <div
        onClick={openProduct}
        className="bg-white p-4 border rounded-lg hover:shadow-md transition duration-200 cursor-pointer flex flex-col h-full"
      >
        <div className="h-52 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">Sponsored</p>
        <h2 className="text-sm font-medium mt-1 line-clamp-2 hover:text-blue-600 min-h-[40px]">
          {product.title}
        </h2>

        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-orange-400 text-xs">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <span className="text-xs text-blue-600">({product.reviews})</span>
        </div>

        <p className="text-xs text-gray-500">{product.bought}</p>

        <div className="mt-2">
          <p className="text-lg font-semibold">₹{product.price}</p>
          <p className="text-xs text-gray-500">
            M.R.P:
            <span className="line-through ml-1">₹{product.mrp}</span>
            <span className="text-green-600 ml-2">({product.discount}% off)</span>
          </p>
          <p className="text-green-600 text-xs">
            Save {product.coupon}% with coupon
          </p>
        </div>

        <p className="text-xs mt-1">
          FREE delivery <b>{product.delivery}</b>
        </p>

        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 hover:bg-yellow-500 mt-auto py-1 rounded-full text-sm font-semibold"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;