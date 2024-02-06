"use client"
import { useState, useEffect } from 'react';
import "@/app/styles/style.css"
import { FaStar, FaTrashAlt } from "react-icons/fa";
import Loader from '../loading';
import CommonToast from '@/components/common/CommonToast';
import Link from 'next/link';
import EmptyPage from '@/components/common/EmptyPage';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '@/redux/slice/productsSlice';
import { fetchWishlist } from '@/redux/slice/wishlistSlice';
import { databases } from '@/appwrite/config';
import { getCurrentUser } from '@/redux/slice/userSlice';

const Wishlist = () => {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist?.items)
  const products = useSelector((state) => state.products.data)
  const user = useSelector((state) => state.user.user)
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const roleID = user?.$id

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  console.log("User state", user?.$id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(fetchWishlist());
        dispatch(fetchProducts());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);


  useEffect(() => {
    const fetchData = async () => {
      const filteredUser = wishlist.filter(item => item.userId === roleID);
      const cartProductIds = filteredUser.map(item => item.productId);
      const filteredCartData = products.filter(product => cartProductIds.includes(product.id));

      Promise.all([filteredCartData, filteredUser])
        .then(([filteredCartData, filteredUser]) => {
          const mergedData = filteredCartData.map(product => ({
            ...product,
            ...filteredUser.find(cartItem => cartItem.productId === product.id)
          }));
          setWishlistItems(mergedData);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    fetchData();
  }, [wishlist, products, roleID]);


  // -- delete cart item -- 
  const handleRemoveItem = async (removeId) => {
    try {
      await databases.deleteDocument('658a5a2edc47302eb5d2', '65bb757810e62620cd15', removeId);
      setWishlistItems((prevItems) => prevItems.filter((item) => item?.$id !== removeId));
      CommonToast("success", "Product Deleted Successfully");
      dispatch(fetchWishlist());
    } catch (error) {
      CommonToast("error", error.message || "Error deleting product");
    }
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
      <div className="container">
        <h2 className="section-heading">My Wishlist</h2>
        {loading && <Loader />}
        {!loading && wishlistItems.length === 0 && <EmptyPage />}
        {!loading && (
          <div className='row'>
            {
              wishlistItems?.map((item) => (
                <div className="col-md-6 col-12 my-3" key={item?.id}>
                  <div className="cart-table-details">
                    <div className="row">
                      <Link href={`/products/${item?.id}`} className="col-10 d-flex align-items-center">
                        <div className="wish-img">
                          <img src={item?.images[0]?.src} alt="altImg" />
                        </div>
                        <div className="product-details">
                          <div className="product-title">{item?.name}</div>
                          <ul className="stars">
                            <li>{renderStars(item?.rating_count)}</li>
                          </ul>
                          <p className="product-price">₹{item?.price}</p>
                        </div>
                      </Link>
                      <div className="col-2 remove-wish">
                        <button className="remove-product" onClick={() => handleRemoveItem(item?.$id)}>
                          <FaTrashAlt className="trash-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Wishlist