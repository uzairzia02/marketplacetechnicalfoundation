'use client'
import Header from "./components/header";
import Newest from "./components/newest";
import Banner from "./components/banner";
import Slider from "./components/slider";
import ProductCards from "./products/productcard";
import { Provider } from "react-redux";
import store from "./redux/store";
import Categories from "./categories/page";

export default function Home() {

  return (

    <Provider store={store}>
   <div>
    <div className="mt-16" ><Header /></div>
    <Slider />
    <Banner />
    <Newest />
    <ProductCards />
    <Categories />

    
   </div>
   </Provider>


  );
}
