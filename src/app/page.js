"use client"
import { useState, useEffect } from 'react';
import BannerSec from "@/components/home/BannerSec";
import ExploreProductSec from "@/components/home/ExploreProductSec";
import ProductCarouselSec from "@/components/home/ProductCarouselSec";
import SocialMediaSec from "@/components/home/SocialMediaSec";
import SubscribeSec from "@/components/home/SubscribeSec";
// import { fetchProducts } from "@/appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slice/productsSlice";

export default function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.data)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Products", products);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);

  //   fetchProducts()
  //     .then((data) => {
  //       setProducts(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching products:', error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <>
      {/* -- Banner --  */}
      <BannerSec />

      {/* -- Shirts For Girls Products --  */}
      <div className="container-fluid pt-5 ps-3"><h2 className="section-heading">Hair Oil For men and women</h2></div>
      <ProductCarouselSec loading={loading} products={products} category="Hair" />

      {/* -- Shoes for men and women Products --  */}
      <div className="container-fluid pt-5 ps-3"><h2 className="section-heading">Shaving for men</h2></div>
      <ProductCarouselSec loading={loading} products={products} category="Shaving" />

      {/* -- Watches for men and women Products --  */}
      <div className="container-fluid pt-5 ps-3">
        <h2 className="section-heading">SKIN CARE for men and women</h2>
        <p className="section-para">Details to details is what makes mascumen different from the others.</p>
      </div>
      <ProductCarouselSec loading={loading} products={products} category="SKIN CARE" />

      {/* -- Dulhan Sarees Products --  */}
      <div className="container-fluid pt-5 ps-3">
        <h2 className="section-heading">Shave gel for men and women</h2>
        <p className="section-para">all type of dulhan sarees available here</p>
      </div>
      <ProductCarouselSec loading={loading} products={products} category="Shave gel" />

      {/* -- All type of Items Products --  */}
      <div className="container-fluid pt-5 ps-3">
        <h2 className="section-heading">All type of Products</h2>
        <p className="section-para">There are all type of items</p>
      </div>
      <ProductCarouselSec loading={loading} products={products} />

      {/* -- Explore Products --  */}
      <ExploreProductSec />

      {/* -- Social Media --  */}
      <div className="container-fluid pt-5 ps-3">
        <h2 className="section-heading">Social Media</h2>
        <p className="section-para">Details to details is what makes Mascumen different from the others.</p>
      </div>
      <SocialMediaSec />

      {/* -- Subscribe --  */}
      <SubscribeSec />
    </>
  )
}
