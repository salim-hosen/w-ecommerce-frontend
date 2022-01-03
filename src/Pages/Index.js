
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import OurProducts from "../Components/OurProducts";
import Policy from "../Components/Policy";
import Slider from "../Components/Slider";

export default function Index(){

    return (
        <div>
            <Navbar></Navbar>
            <Slider></Slider>
            <Policy></Policy>
            <OurProducts></OurProducts>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
}