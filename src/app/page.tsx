import { ProductCards } from "./products/page";
import Header from "./components/header";
import Newest from "./components/newest";
import Banner from "./components/banner";
import Slider from "./components/slider";

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
