import ProductCard from "./ProductCard";

export default function(){

    const products = [
        {
            id: 1,
            image: 'images/product1.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 5.0,
            price: 7.0,
        },
        {
            id: 2,
            image: 'images/product2.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 4.8,
            price: 8.5,
        },
        {
            id: 3,
            image: 'images/product3.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 4.5,
            price: 4.5,
        },
        {
            id: 4,
            image: 'images/product4.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 5.0,
            price: 4.35,
        },
        {
            id: 6,
            image: 'images/product5.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 5.0,
            price: 7.0,
        },
        {
            id: 7,
            image: 'images/product6.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 4.8,
            price: 8.5,
        },
        {
            id: 8,
            image: 'images/product7.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 4.5,
            price: 4.5,
        },
        {
            id: 9,
            image: 'images/product8.png',
            title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
            rating: 5.0,
            price: 4.35,
        },
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 my-5">

            <h1 className="text-center text-5xl font-bold">Our Products</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5 text-white">
                {
                    products.map(product => (<ProductCard key={product.id} product={product}></ProductCard>))
                }
            </div>

            <div className="text-center">
                <a href="#" className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">All Products</a>
            </div>
        </section>
    );
}