import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderSuccess = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 2; // ✅ limit

  // ✅ Fetch orders
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders.reverse()); // latest first
  }, []);

  if (!state) {
    return <h2 className="p-10 text-center">No Order Found</h2>;
  }

  // 📊 PAGINATION LOGIC
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* 🎉 SUCCESS */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>

        <p className="mt-4">
          Your Order ID: <b>{state.orderId}</b>
        </p>

        <p className="mt-2 text-lg font-semibold">
          Total Paid: ₹{state.totalPrice}
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Go to Home
        </button>
      </div>

      {/* 🧾 ORDERS */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          🛒 Your Previous Orders
        </h2>

        {orders.length === 0 ? (
          <p>No past orders found</p>
        ) : (
          <>
            <div className="space-y-6">

              {currentOrders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-xl p-5 border"
                >
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold">
                      Order ID: {order.orderId}
                    </span>
                    <span className="text-sm text-gray-500">
                      {order.date}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm border-b pb-1"
                      >
                        <span>
                          {item.title} (x{item.quantity})
                        </span>
                        <span>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 text-right font-semibold">
                    Total: ₹{order.totalPrice}
                  </div>
                </div>
              ))}

            </div>

            {/* 🔢 PAGINATION CONTROLS */}
            <div className="flex justify-center items-center gap-3 mt-8">

              {/* Prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>

            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default OrderSuccess;