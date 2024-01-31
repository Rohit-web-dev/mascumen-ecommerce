"use client"
import { useState, useEffect, useContext } from 'react';
import Link from "next/link";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import { FaEye, FaStar, FaCartPlus, FaHeart } from "react-icons/fa";
import Loader from "@/app/loading";
import { addToWishlist, getWishlistData, } from '@/appwrite/config';
import CommonToast from '../common/CommonToast';
import userContext from '@/context/user/userContext';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartData } from '@/redux/slice/cartSlice';

const ProductCarouselSec = ({ loading, products, category }) => {
  // const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart?.items)

  useEffect(() => {
    dispatch(addToCart());
    dispatch(fetchCartData());
  }, [dispatch]);


  const currentUserID = useContext(userContext)
  const roleID = currentUserID?.currentUserRollID

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

  console.log(cart);

  // -- Add to cart --
  const handleCartClick = async (clickedItemId) => {
    if (roleID === '' || roleID === undefined) {
      CommonToast("error", "You are not logged in user");
    } else {
      const isItemInCart = cart.some((item) => item?.productId === clickedItemId);
      if (isItemInCart) {
        CommonToast("error", "Product already in the cart");
      } else {
        dispatch(addToCart(clickedItemId, roleID));
        dispatch(fetchCartData());
        try {
          if (cart) {
            const updatedCartData = cart.filter(item => item?.userId === roleID);
            dispatch(fetchCartData());
            console.log(updatedCartData);
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
    if (roleID === '' || roleID === undefined) {
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
        {/* {loading && <Loader />}
        {!loading && ( */}
        <Carousel cols={5} rows={1} gap={10} responsiveLayout={responsiveLayout}>
          {
            filteredProducts && filteredProducts.map((item) => (
              <Carousel.Item key={item?.$id}>
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
        {/* )} */}
      </section>
    </>
  )
}

export default ProductCarouselSec