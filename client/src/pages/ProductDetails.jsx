import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaUndoAlt, FaTruck, FaAward, FaShieldAlt, FaBox } from "react-icons/fa";

import Navbar from "../components/Navbar";   // ✅ added
import Footer from "../components/Footer";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // fetch product from backend
  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 className="p-10 text-center text-lg font-semibold">
          Loading product...
        </h2>
      </>
    );
  }

  const images = product.images || [product.image];

  // next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  // previous image
  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // buy now
  const handleBuyNow = () => {

    const item = { ...product, quantity: 1 };

    navigate("/checkout", {
      state: {
        cartItems: [item],
        totalPrice: product.price,
      },
    });

  };

  return (

    <>
    
    {/* ✅ Navbar */}
    <Navbar />

    <div className="p-6 grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">

      {/* LEFT SIDE IMAGE */}
      <div className="flex gap-4">

        {/* thumbnails */}
        <div className="flex flex-col gap-3">

          {images.map((img, index) => (

            <img
              key={index}
              src={img}
              onClick={() => setCurrentImage(index)}
              className={`h-16 w-16 object-contain border cursor-pointer rounded 
              ${currentImage === index
                ? "border-orange-500"
                : "border-gray-300"
              }`}
            />

          ))}

        </div>

        {/* main image */}
        <div className="relative flex-1 bg-white p-4 rounded-lg shadow">

          <img
            src={images[currentImage]}
            alt={product.title}
            className="w-full h-[400px] object-contain hover:scale-105 transition duration-300"
          />

          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FaChevronRight />
          </button>

        </div>

      </div>


      {/* RIGHT SIDE DETAILS */}
      <div>

        <h1 className="text-3xl font-bold">
          {product.title}
        </h1>

        <p className="text-gray-600 mt-3">
          {product.description || "No description available"}
        </p>

        {/* price */}
        <div className="mt-4">

          <span className="text-3xl font-bold">
            ₹{product.price}
          </span>

          {product.mrp && (
            <span className="ml-3 text-gray-500 line-through">
              ₹{product.mrp}
            </span>
          )}

        </div>

        {/* stock */}
        <p className="mt-2">

          {product.stock > 0
            ? <span className="font-semibold">In Stock</span>
            : <span className="text-red-500 font-semibold">Out of Stock</span>
          }

        </p>

        {/* delivery */}
        <p className="text-sm text-gray-600 mt-2">

          FREE delivery by <b>{product.delivery || "Tomorrow"}</b>

        </p>


        {/* TRUST BADGES */}
        <div className="grid grid-cols-5 gap-4 mt-6 text-center border-t pt-4">

          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaUndoAlt className="text-orange-500 text-xl mb-1" />
            10 days Return
          </div>

          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaTruck className="text-orange-500 text-xl mb-1" />
            Free Delivery
          </div>

          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaAward className="text-orange-500 text-xl mb-1" />
            Top Brand
          </div>

          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaBox className="text-orange-500 text-xl mb-1" />
            Amazon Delivered
          </div>

          <div className="flex flex-col items-center text-xs text-gray-600">
            <FaShieldAlt className="text-orange-500 text-xl mb-1" />
            Secure transaction
          </div>

        </div>


        {/* buttons */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={() =>
              addToCart({ ...product, quantity: 1 })
            }
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded font-semibold"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>

    <Footer />

    </>

  );

};

export default ProductDetails;