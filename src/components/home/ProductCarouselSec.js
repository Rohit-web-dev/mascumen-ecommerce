"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import { FaEye, FaStar, FaCartPlus } from "react-icons/fa";
import { fetchProducts } from "@/appwrite/config";
import Loader from '@/app/loading';

const ProductCarouselSec = () => {
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

  const responsiveLayout = [
    {
      breakpoint: 1024,
      cols: 4,
    },
    {
      breakpoint: 800,
      cols: 3,
    },
  ]

  return (
    <>
      <section className="section products-carousel">
        {loading && <Loader />}
        {!loading && (
          <Carousel cols={5} rows={1} gap={10} responsiveLayout={responsiveLayout}>
            {
              products.map((item) => (
                <Carousel.Item key={item?.id}>
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li><Link href={`products/${item?.$id}`}><FaEye className="icon" /></Link></li>
                          <li><Link href="/wishlist"><FaStar className="icon" /></Link></li>
                          <li><Link href="/cart"><FaCartPlus className="icon" /></Link></li>
                        </ul>
                      </div>
                      <img src={item?.img} alt={item?.title} />
                    </div>
                    <div className="down-content">
                      <h4>{item?.title}</h4>
                      <div className="d-flex justify-content-between">
                        <span>${item?.price}</span>
                        <ul className="stars">
                          <li><FaStar className="icon" /></li>
                          <li><FaStar className="icon" /></li>
                          <li><FaStar className="icon" /></li>
                          <li><FaStar className="icon" /></li>
                          <li><FaStar className="icon" /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))
            }
          </Carousel>
        )}
      </section>
    </>
  )
}

export default ProductCarouselSec