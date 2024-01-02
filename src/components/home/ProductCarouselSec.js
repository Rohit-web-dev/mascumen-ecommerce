"use client"
import Link from "next/link";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import { FaEye, FaStar, FaCartPlus } from "react-icons/fa";
import Loader from "@/app/loading";

const ProductCarouselSec = ({ loading, products, category }) => {

  // Filter products based on the category
  const filteredProducts = category ? products.filter(item => item.category === category) : products;

  // -- product rating color -- 
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? '#fe696a' : '#a1a1a1';
      stars?.push(<FaStar key={i} className="star-icon" style={{ color: starColor }} />);
    }
    return stars;
  };


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
              filteredProducts && filteredProducts.map((item) => (
                <Carousel.Item key={item?.$id}>
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li><Link href={`/products/${item?.$id}`}><FaEye className="icon" /></Link></li>
                          <li><Link href="/wishlist"><FaStar className="icon" /></Link></li>
                          <li><Link href="/cart"><FaCartPlus className="icon" /></Link></li>
                        </ul>
                      </div>
                      <img src={item?.img} alt={item?.title} />
                    </div>
                    <div className="down-content">
                      <h4>{item?.title}</h4>
                      <div className="d-flex justify-content-between">
                        <span>₹{item?.price}</span>
                        <ul className="stars">
                          <li>{renderStars(item?.rating)}</li>
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