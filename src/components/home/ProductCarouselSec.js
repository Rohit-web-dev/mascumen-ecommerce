"use client"
import { useState, useEffect, useContext } from 'react';
import Link from "next/link";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import { FaEye, FaStar, FaCartPlus, FaHeart } from "react-icons/fa";
import Loader from "@/app/loading";
import CommonToast from '../common/CommonToast';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartData } from '@/redux/slice/cartSlice';
import { addToWishlist, fetchWishlist } from '@/redux/slice/wishlistSlice';
import appwriteService from '@/appwrite/config';
import { currentUser } from '@/redux/slice/authSlice';

const ProductCarouselSec = ({ products, category }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart?.items)
  const wishlist = useSelector((state) => state.wishlist?.items)
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await appwriteService.getCurrentUser();
        dispatch(currentUser({ userData }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const roleID = auth?.userData?.$id

  // cart data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(addToCart());
        dispatch(fetchCartData());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);


  // wishlist data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(addToWishlist());
        dispatch(fetchWishlist());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);


  // Filter products based on the category
  const filteredProducts = category ? products.filter(item => item?.categories?.[0]?.name === category) : products;


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
  const handleCartClick = async (clickedItemId) => {
    if (roleID === '' || roleID === undefined) {
      CommonToast("error", "You are not logged in user");
    } else {
      const isItemInCart = cart.some((item) => item?.productId === clickedItemId);
      const isUserInCart = cart.some((item) => item?.userId === roleID);
      if (isItemInCart && isUserInCart) {
        CommonToast("error", "Product already in the cart");
      } else {
        dispatch(addToCart({clickedItemId, roleID}));
        dispatch(fetchCartData());
        try {
          if (cart) {
            const updatedCartData = cart.filter(item => item?.userId === roleID);
            dispatch(fetchCartData());
            // console.log(updatedCartData);
            CommonToast("success", "Product Added To Cart");
          } else {
            console.error('Error: Cart is undefined');
          }
        } catch (error) {
          console.error('Error fetching updated cart data:', error);
        }
      }
    }
  };



  // -- Add to wishlist --
  const handleWishlistClick = async (clickedItemId) => {
    if (roleID === '' || roleID === undefined) {
      CommonToast("error", "You are not logged in user");
    } else {
      const isItemInCart = wishlist.some((item) => item?.productId === clickedItemId);
      if (isItemInCart) {
        CommonToast("error", "Product already in the wishlist");
      } else {
        dispatch(addToWishlist({clickedItemId, roleID}));
        dispatch(fetchWishlist());
        try {
          if (wishlist) {
            const updatedCartData = wishlist.filter(item => item?.userId === roleID);
            dispatch(fetchWishlist());
            // console.log(updatedCartData);
            CommonToast("success", "Product Added To wishlist");
          } else {
            console.error('Error: wishlist is undefined');
          }
        } catch (error) {
          console.error('Error fetching updated wishlist data:', error);
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
                <Carousel.Item key={item?.id}>
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li><Link href={`/products/${item?.id}`}><FaEye className="icon" /></Link></li>
                          <li><a onClick={() => handleWishlistClick(item?.id)}><FaHeart className="icon" /></a></li>
                          <li><a onClick={() => handleCartClick(item?.id)}><FaCartPlus className="icon" /></a></li>
                        </ul>
                      </div>
                      <img src={item?.images?.[0]?.src} alt={item?.title} />
                    </div>
                    <div className="down-content">
                      <h4>{item?.name}</h4>
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