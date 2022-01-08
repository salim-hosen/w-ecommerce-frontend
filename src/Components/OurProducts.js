import ProductCard from "./ProductCard";
import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { API_HOST } from "../config/constant";
import { Link } from "react-router-dom";

export default function(){

    const [products, setProducts] = useState([])

    async function loadProducts(){
        axios.get(`${API_HOST}/products?per_page=12`)
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <section className="max-w-6xl mx-auto px-4 my-5">

            <h1 className="text-center text-4xl font-bold">Our Products</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5 text-white">
                {
                    products.map(product => (<ProductCard key={product.id} product={product}></ProductCard>))
                }
            </div>

            <div className="text-center pt-10">
                <Link to="/products" className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-10 border border-indigo-500 hover:border-transparent rounded">All Products</Link>
            </div>
        </section>
    );
}