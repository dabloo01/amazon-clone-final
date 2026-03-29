import { FaSearch, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";

function Navbar({
  search = "",
  setSearch = () => {},
  category = "all",
  setCategory = () => {},
  price = "all",
  setPrice = () => {},
}) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { cartItems } = useCart() || [];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = () => navigate("/");

  const changeCategory = (value) => {
    setCategory(value);
    navigate("/");
  };

  return (
    <div>
      {/* TOP BAR */}
      <div className="bg-[#131921] text-white px-4 py-2">
        
        {/* ✅ MOBILE + TABLET LAYOUT */}
        <div className="flex flex-col gap-2 md:hidden">

          {/* Row 1 */}
          <div className="flex justify-between items-center">
            <h1
              onClick={() => navigate("/")}
              className="text-xl font-bold cursor-pointer"
            >
              amazon<span className="text-orange-400">.in</span>
            </h1>

            <Link to="/cart">
              <div className="flex items-center gap-1 font-semibold cursor-pointer">
                <FaShoppingCart />
                {totalItems}
              </div>
            </Link>
          </div>

          {/* Row 2 - Search */}
          <div className="flex w-full h-[38px] rounded-md overflow-hidden bg-white">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search Amazon.in"
              className="flex-1 px-3 text-black outline-none text-sm"
            />

            <button
              onClick={handleSearch}
              className="bg-orange-400 px-4 flex items-center justify-center"
            >
              <FaSearch className="text-black" />
            </button>
          </div>
        </div>

        {/* ✅ DESKTOP LAYOUT (UNCHANGED) */}
        <div className="hidden md:flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <h1
              onClick={() => navigate("/")}
              className="text-2xl font-bold cursor-pointer"
            >
              amazon<span className="text-orange-400">.in</span>
            </h1>

            <div className="flex items-center gap-1 text-sm">
              <FaMapMarkerAlt />
              <div>
                <p className="text-xs text-gray-300">Delivering to India</p>
                <p className="font-semibold">Update location</p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="flex w-[55%] h-[40px] rounded-md overflow-hidden bg-white">
            <select
              value={category}
              onChange={(e) => changeCategory(e.target.value)}
              className="bg-gray-100 text-black px-3 text-sm outline-none border-r"
            >
              <option value="all">All</option>
              <option value="mobiles">Mobiles</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search Amazon.in"
              className="flex-1 px-3 text-black outline-none text-sm"
            />

            <button
              onClick={handleSearch}
              className="bg-orange-400 hover:bg-orange-500 px-4 flex items-center justify-center"
            >
              <FaSearch className="text-black text-lg" />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex gap-6 text-sm items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div
                onClick={() => navigate("/sign-in")}
                className="cursor-pointer"
              >
                <p className="text-xs">Hello, sign in</p>
                <p className="font-semibold">Account & Lists</p>
              </div>
            )}

            <div>
              <p className="text-xs">Returns</p>
              <p className="font-semibold">& Orders</p>
            </div>

            <Link to="/cart">
              <div className="flex items-center gap-1 font-semibold cursor-pointer">
                <FaShoppingCart />
                Cart ({totalItems})
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#232F3E] text-white px-4 py-2 text-sm overflow-x-auto">
        <div className="flex gap-6 items-center whitespace-nowrap">

          <div
            onClick={() => changeCategory("all")}
            className={`flex items-center gap-2 cursor-pointer ${
              category === "all" ? "font-bold underline" : ""
            }`}
          >
            <GiHamburgerMenu />
            All
          </div>

          {["mobiles", "electronics", "fashion", "books"].map((cat) => (
            <p
              key={cat}
              onClick={() => changeCategory(cat)}
              className={`cursor-pointer capitalize ${
                category === cat ? "font-bold underline" : ""
              }`}
            >
              {cat}
            </p>
          ))}

          <select
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              navigate("/");
            }}
            className="text-black px-2 py-1 rounded"
          >
            <option value="all">All Price</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1000</option>
            <option value="2000">Under ₹2000</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Navbar;