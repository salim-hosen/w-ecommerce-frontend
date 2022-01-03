import { Fragment } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function ProductDetails() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2">
            <img
              alt="ecommerce"
              className="w-full object-cover object-center rounded border border-gray-200"
              src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
            />
            <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                The Catcher in the Rye
              </h1>
              <div className="flex mb-4">{/* Social Icon */}</div>
              <p className="leading-relaxed">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">In Stock:</span>
                  <span>50</span>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  $58.00
                </span>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Add to Cart
                </button>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </Fragment>
  );
}
