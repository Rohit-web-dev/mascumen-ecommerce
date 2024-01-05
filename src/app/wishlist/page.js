"use client"
import { useState, useEffect } from 'react';
import "@/app/styles/style.css"
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { getWishlistData } from '@/appwrite/config';
import Loader from '../loading';
import { roleID } from '@/appwrite/config';
import { removeWishlistItem } from '@/appwrite/config';
import CommonToast from '@/components/common/CommonToast';
import Link from 'next/link';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWishlistData()
      .then((data) => {
        setWishlistItems(data?.filter(item => item.userId === roleID));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  // -- delete cart item -- 
  const removeItem = (id) => {
    removeWishlistItem(id)
      .then(() => {
        setWishlistItems((prevItems) => prevItems.filter((item) => item?.$id !== id));
        CommonToast("success", "Deleted Successfully");
      })
      .catch((error) => {
        CommonToast("error", error);
      });
  };

  // -- products rating -- 
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? '#fe696a' : '#a1a1a1';
      stars?.push(<FaStar key={i} className="star-icon" style={{ color: starColor }} />);
    }
    return stars;
  };

  return (
    <div className="wishlist-sec">
      {loading && <Loader />}
      {!loading && (
        <div className="container">
          <h2 className="section-heading">My Wishlist</h2>
          <div className='row'>
            {
              wishlistItems?.map((item) => (
                <div className="col-md-6 col-12 my-3">
                  <div className="cart-table-details">
                    <div className="row">
                      <Link href={`/products/${item?.ecommerceWebProducts[0]?.$id}`} className="col-10 d-flex align-items-center">
                        <div className="wish-img">
                          <img src={item?.ecommerceWebProducts[0]?.img} alt="altImg" />
                        </div>
                        <div className="product-details">
                          <div className="product-title">{item?.ecommerceWebProducts[0]?.title}</div>
                          <ul className="stars">
                            <li>{renderStars(item?.ecommerceWebProducts[0]?.rating)}</li>
                          </ul>
                          <p className="product-price">₹{item?.ecommerceWebProducts[0]?.price}</p>
                        </div>
                      </Link>
                      <div className="col-2 remove-wish">
                        <button className="remove-product" onClick={() => removeItem(item?.$id)}>
                          <FaTrashAlt className="trash-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Wishlist