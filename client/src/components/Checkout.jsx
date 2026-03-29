import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Checkout = () => {

  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // 💰 Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {

    const { fullName, phone, addressLine, city, state, pincode, country } = address;

    // ✅ Validation
    if (!fullName || !phone || !addressLine || !city || !state || !pincode || !country) {
      alert("Please fill all fields properly");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const orderId = "ORD" + Math.floor(Math.random() * 1000000);

    // 🛒 Order Data
    const orderData = {
      orderId,
      ...address,
      totalPrice,
      items: cartItems.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {

      // 📧 Send to Formspree
      await fetch("https://formspree.io/f/meepewgn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      // 💾 Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const newOrder = {
        orderId,
        totalPrice,
        items: cartItems,
        date: new Date().toLocaleString()
      };

      localStorage.setItem(
        "orders",
        JSON.stringify([newOrder, ...existingOrders])
      );

      // 🚀 Redirect
      navigate("/order-success", {
        state: { orderId, totalPrice }
      });

    } catch (error) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
 <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* 🏠 SHIPPING FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Shipping Address
          </h2>

          <div className="space-y-4">

            {["fullName","phone","addressLine","city","state","pincode","country"].map((field, i) => (
              <div key={i}>
                <label className="text-sm font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>

                {field === "addressLine" ? (
                  <textarea
                    name={field}
                    value={address[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={address[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                )}
              </div>
            ))}

          </div>

        </div>

        {/* 🧾 ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit sticky top-6">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto">

            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span>{item.title} (x{item.quantity})</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

          </div>

          <div className="mt-6 border-t pt-4">

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition 
                ${loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"}`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </div>

        </div>

      </div>
      <Footer/>

    </div>
    </>
  );
};

export default Checkout;