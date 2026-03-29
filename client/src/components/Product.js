import { useEffect, useState } from "react";
import axios from "axios";

const API_PRODUCTS = "http://localhost:5000/api/products";
const API_CART = "http://localhost:5000/api/products/cart";

function Products() {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_PRODUCTS);
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      await axios.post(API_CART, {
        product_id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      alert(`${product.title} added to cart!`);
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="h-40 w-full object-cover"/>
          <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
          <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;