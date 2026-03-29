import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const Home = () => {

  // state for products from backend
  const [products, setProducts] = useState([]);

  // filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");


  // fetch products from backend
  useEffect(() => {

    axios
      .get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

  }, []);


  // filtering logic
  const filteredProducts = products.filter((item) => {

    // category filter
    const matchCategory =
      category === "all"
        ? true
        : item.category === category;


    // search filter
    const matchSearch =
      item.title
        .toLowerCase()
        .includes(search.toLowerCase());


    // price filter
    const matchPrice =
      price === "all"
        ? true
        : item.price <= Number(price);


    return matchCategory && matchSearch && matchPrice;

  });


  return (

    <>

      {/* NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        price={price}
        setPrice={setPrice}
      />


      {/* PRODUCTS */}
      <div className="bg-gray-200 p-6 min-h-screen">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {
            filteredProducts.length > 0 ? (

              filteredProducts.map(product => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

            ) : (

              <p className="col-span-full text-center text-gray-500 text-lg">

                No products found

              </p>

            )
          }

        </div>

      </div>


      <Footer/>

    </>

  );

};

export default Home;