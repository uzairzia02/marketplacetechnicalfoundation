import Header from "./components/header";
import Newest from "./components/newest";
import Banner from "./components/banner";
import Slider from "./components/slider";
import ProductCards from "./products/productcard";

export default function Home() {
  return (
   <div>
    <div className="mt-16" ><Header /></div>
    <Slider />
    <Banner />
    <Newest />
    <ProductCards />
   </div>

  );
}
