export default function(){

    return (
        <section className="max-w-6xl mx-auto px-4 my-5">
        <h1 className="text-center text-5xl font-bold">Why Shop With Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 text-white">
          <div className="text-center p-5 bg-indigo-900 rounded-md">
            <img width="60" src="images/delivery.svg" alt="" className="mx-auto mb-2"/>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p>variations of passages of Lorem Ipsum available</p>
          </div>
          <div className="text-center p-5 bg-indigo-900 rounded-md">
            <img width="60" src="images/free.svg" alt="" className="mx-auto mb-2"/>
            <h3 className="text-xl font-bold">Free Shipping</h3>
            <p>variations of passages of Lorem Ipsum available</p>
          </div>
          <div className="text-center p-5 bg-indigo-900 rounded-md">
            <img width="60" src="images/quality.svg" alt="" className="mx-auto mb-2"/>
            <h3 className="text-xl font-bold">Best Quality</h3>
            <p>variations of passages of Lorem Ipsum available</p>
          </div>
        </div>
      </section>
    );
}