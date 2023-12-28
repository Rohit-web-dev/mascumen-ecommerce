"use client"
import { useState, useEffect } from 'react';
import BannerSec from "@/components/home/BannerSec";
import ExploreProductSec from "@/components/home/ExploreProductSec";
import ProductCarouselSec from "@/components/home/ProductCarouselSec";
import SocialMediaSec from "@/components/home/SocialMediaSec";
import SubscribeSec from "@/components/home/SubscribeSec";
import { fetchProducts } from "@/appwrite/config";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* -- Banner --  */}
      <BannerSec />

      {/* -- Shirts For Girls Products --  */}
      <div class="container-fluid pt-5 ps-3"><h2 class="section-heading">Shirts For Girls</h2></div>
      <ProductCarouselSec loading={loading} products={products} category="shirts" />

      {/* -- Shoes for men and women Products --  */}
      <div class="container-fluid pt-5 ps-3"><h2 class="section-heading">Shoes for men and women</h2></div>
      <ProductCarouselSec loading={loading} products={products} category="shoes" />

      {/* -- Watches for men and women Products --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">Watches for men and women</h2>
        <p class="section-para">Details to details is what makes mascumen different from the others.</p>
      </div>
      <ProductCarouselSec loading={loading} products={products} category="watch" />

      {/* -- Dulhan Sarees Products --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">Dulhan Sarees</h2>
        <p class="section-para">all type of dulhan sarees available here</p>
      </div>
      <ProductCarouselSec loading={loading} products={products} category="saree" />

      {/* -- All type of Items Products --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">All type of Products</h2>
        <p class="section-para">There are all type of items</p>
      </div>
      <ProductCarouselSec loading={loading} products={products} />

      {/* -- Explore Products --  */}
      <ExploreProductSec />

      {/* -- Social Media --  */}
      <div class="container-fluid pt-5 ps-3">
        <h2 class="section-heading">Social Media</h2>
        <p class="section-para">Details to details is what makes Mascumen different from the others.</p>
      </div>
      <SocialMediaSec />

      {/* -- Subscribe --  */}
      <SubscribeSec />
    </>
  )
}
