import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const API_CART = "http://localhost:5000/api/products/cart";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(API_CART);
      setCartItems(res.data);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const incrementQty = async (id) => {
    const item = cartItems.find((c) => c.id === id);
    await axios.put(`${API_CART}/${id}`, { quantity: item.quantity + 1 });
    fetchCart();
  };

  const decrementQty = async (id) => {
    const item = cartItems.find((c) => c.id === id);
    if (item.quantity > 1) {
      await axios.put(`${API_CART}/${id}`, { quantity: item.quantity - 1 });
      fetchCart();
    }
  };

  const removeFromCart = async (id) => {
    await axios.delete(`${API_CART}/${id}`);
    fetchCart();
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h1 className="text-2xl mb-4">Shopping Cart</h1>

          {cartItems.length === 0 && <p>Your cart is empty</p>}

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 object-cover"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decrementQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 mt-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - CHECKOUT PANEL */}
        <div className="bg-white p-5 rounded shadow h-fit sticky top-6">

          {/* FREE DELIVERY BAR */}
          <div className="bg-green-50 border border-green-200 p-3 rounded mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                ✔ Your order is eligible for FREE Delivery.
              </div>
              <span className="font-semibold text-gray-800">
                ₹{subtotal}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Choose <span className="text-blue-600">FREE Delivery</span> option at checkout.
            </p>
          </div>

          {/* SUBTOTAL */}
          <p className="text-lg font-semibold mb-3">
            Subtotal ({cartItems.length} item):{" "}
            <span className="font-bold">₹{subtotal.toFixed(2)}</span>
          </p>

          {/* GIFT CHECKBOX */}
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" />
            <label className="text-sm text-gray-700">
              This order contains a gift
            </label>
          </div>

          {/* BUTTON */}
          <a href="/checkout"><button className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full font-semibold">
            Proceed to Buy
          </button></a>


        </div>
      </div>
    </div>
  );
}

export default Cart;