"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import { FaEye, FaStar, FaCartPlus, FaHeart } from "react-icons/fa";
import Loader from "@/app/loading";
import { addToCart, addToWishlist, getCartData, getWishlistData, roleID } from '@/appwrite/config';
import CommonToast from '../common/CommonToast';

const ProductCarouselSec = ({ loading, products, category }) => {
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);

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


  // -- Add to cart --
  //  get cart data 
  useEffect(() => {
    getCartData()
      .then((data) => {
        setCartData(data?.filter(item => item.userId === roleID));
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const handleCartClick = async (clickedItemId) => {
    if (roleID === '') {
      CommonToast("error", "You are not logged in user");
    } else {
      const isItemInCart = cartData?.some((item) => item?.ecommerceWebProducts[0]?.$id === clickedItemId);
      if (isItemInCart) {
        CommonToast("error", "Product already in the cart");
      } else {
        await addToCart(clickedItemId, roleID, 1);
        try {
          const updatedCartData = await getCartData();
          setCartData(updatedCartData?.filter(item => item.userId === roleID));
          CommonToast("success", "Product Added To Cart");
        } catch (error) {
          console.error('Error fetching updated cart data:', error);
        }
      }
    }
  };


  // -- Add to wishlist --
  //  get wishlist data 
  useEffect(() => {
    getWishlistData()
      .then((data) => {
        setWishlistData(data?.filter(item => item.userId === roleID));
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const handleWishlistClick = async (clickedItemId) => {
    if (roleID === '') {
      CommonToast("error", "You are not logged in user");
    } else {
      const isItemInCart = wishlistData?.some((item) => item?.ecommerceWebProducts[0]?.$id === clickedItemId);
      if (isItemInCart) {
        CommonToast("error", "Product already in the wishlist");
      } else {
        await addToWishlist(clickedItemId, roleID, 1);
        try {
          const updatedWishlistData = await getWishlistData();
          setWishlistData(updatedWishlistData?.filter(item => item.userId === roleID));
          CommonToast("success", "Product Added To Wishlist");
        } catch (error) {
          console.error('Error fetching updated cart data:', error);
        }
      }
    }
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
                          <li><a onClick={() => handleWishlistClick(item?.$id)}><FaHeart className="icon" /></a></li>
                          <li><a onClick={() => handleCartClick(item?.$id)}><FaCartPlus className="icon" /></a></li>
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