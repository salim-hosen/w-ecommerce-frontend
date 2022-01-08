import axios from "axios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { API_HOST } from "../config/constant";
import React, { Fragment, useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";

export default function AllProduct() {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    axios
      .get(`${API_HOST}/products?per_page=12`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Navbar></Navbar>

      <section className="max-w-6xl mx-auto px-4 my-5">
        <h1 className="text-center text-4xl font-bold">All Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5 text-white">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}
