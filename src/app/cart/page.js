"use client"
import { useState, useEffect } from 'react';
import "@/app/styles/style.css"
import { FaTrashAlt } from "react-icons/fa";
import img from '../../../public/assets/images/products-page-heading.jpg'
import Banner from '@/components/common/Banner';
import { databases } from '@/appwrite/config';
import Loader from '../loading';
import CommonToast from '@/components/common/CommonToast';
import EmptyPage from '@/components/common/EmptyPage';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from '@/redux/slice/cartSlice';
import { fetchProducts } from '@/redux/slice/productsSlice';
import appwriteService from '@/appwrite/config';
import { currentUser } from '@/redux/slice/authSlice';

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart?.items)
  const products = useSelector((state) => state.products.data)
  const auth = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [mergedData, setMergedData] = useState([]);

  const taxRate = 0.05;
  const shippingRate = 15.0;


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

  // console.log("auth", auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(fetchCartData());
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
      const filteredUser = cart.filter(item => item.userId === roleID);
      const cartProductIds = filteredUser.map(item => item.productId);
      const filteredCartData = products.filter(product => cartProductIds.includes(product.id));

      Promise.all([filteredCartData, filteredUser])
        .then(([filteredCartData, filteredUser]) => {
          const mergedData = filteredCartData.map(product => ({
            ...product,
            ...filteredUser.find(cartItem => cartItem.productId === product.id)
          }));
          setMergedData(mergedData);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
    fetchData();
  }, [cart, products, auth]);


  useEffect(() => {
    recalculateCart();
  }, [mergedData])


  const recalculateCart = () => {
    let subtotal = 0;
    mergedData.forEach((item) => {
      subtotal += (item.price || 0) * (item?.productItem || 0);
      setSubTotal(subtotal);
    });
    const tax = subTotal * taxRate;
    const shipping = subtotal > 0 ? shippingRate : 0;
    const total = subTotal + tax + shipping;
    setCartTotal(total);
  };


  const incrementQuantity = (id) => {
    setMergedData((prevItems) =>
      prevItems.map((item) =>
        item?.id === id ? { ...item, productItem: item?.productItem + 1 } : item
      )
    );
  };


  const decrementQuantity = (id) => {
    setMergedData((prevItems) =>
      prevItems.map((item) =>
        item?.id === id && item.productItem > 1
          ? { ...item, productItem: item?.productItem - 1 }
          : item
      )
    );
  };


  // -- delete cart item -- 
  const handleRemoveItem = async (removeId) => {
    try {
      await databases.deleteDocument('658a5a2edc47302eb5d2', '65b9de309cc3fed93e3c', removeId);
      setMergedData((prevItems) => prevItems.filter((item) => item?.$id !== removeId));
      CommonToast("success", "Product Deleted Successfully");
      dispatch(fetchCartData());
    } catch (error) {
      CommonToast("error", error.message || "Error deleting product");
    }
  };


  // -- Update cart item -- 
  const handleCartUpdate = async () => {
    try {
      const updatedData = mergedData.map((item) => {
        const updatedData = {
          productItem: item.productItem,
        };
        const jsonString = JSON.stringify(updatedData);
        return databases.updateDocument('658a5a2edc47302eb5d2', '65b9de309cc3fed93e3c', item.$id, jsonString);
      });
      await Promise.all(updatedData);
      CommonToast("success", "Cart Updated Successfully");
    } catch (error) {
      console.error('Error updating cart items:', error);
      CommonToast("error", `Error updating cart items: ${error.message}`);
    }
  };


  return (
    <>
      {/* -- banner --  */}
      <Banner
        Img={img}
        Title={"Check Our Products"}
        Para={"Style is a way to say who you are without having to speak"}
      />

      <div className="cart-page container-fluid pt-5">
        {loading && <Loader />}
        {!loading && (
          <>
            {
              mergedData.length === 0 ? <EmptyPage /> :
                <div className="row px-xl-5 mb-5">
                  <div className="col-lg-9 my-2">
                    <div className="cart-table-details">
                      <div className="section-heading pb-3">
                        <h2>Shopping Cart</h2>
                      </div>
                      <div className="shopping-cart">
                        <div className="column-labels">
                          <label className="product-image">Image</label>
                          <label className="product-details">Product</label>
                          <label className="product-price">Price</label>
                          <label className="product-quantity">Quantity</label>
                          <label className="product-removal">Remove</label>
                          <label className="product-line-price">Total</label>
                        </div>
                        {mergedData?.map((item) => (
                          <div className="product" key={item?.id}>
                            <div className="product-image">
                              <img src={item?.images[0]?.src} alt="altImg" />
                            </div>
                            <div className="product-details">
                              <div className="product-title">{item?.name}</div>
                              <p className="product-description">{item?.short_description}</p>
                            </div>
                            <div className="product-price">{item?.price}</div>
                            <div className="product-quantity">
                              <button onClick={() => decrementQuantity(item?.id)}>-</button>
                              <input type="text" value={item?.productItem} readOnly />
                              <button onClick={() => incrementQuantity(item?.id)}>+</button>
                            </div>
                            <div className="product-removal">
                              <button
                                className="remove-product"
                                onClick={() => handleRemoveItem(item?.$id)}
                              >
                                <FaTrashAlt className="trash-icon" />
                              </button>
                            </div>
                            <div className="product-line-price">
                              {(item?.price * item?.productItem).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 my-2">
                    <div className="total-value-sec py-4">
                      <form className="mb-3" action="">
                        <div className="input-group apply-coupon">
                          <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                          <div className="input-group-append">
                            <button className="btn btn-primary">Apply Coupon</button>
                          </div>
                        </div>
                      </form>
                      <div className="totals">
                        <div className="totals-item">
                          <label>Subtotal</label>
                          <div className="totals-value" id="cart-subtotal">
                            {subTotal.toFixed(2)}
                          </div>
                        </div>
                        <div className="totals-item">
                          <label>Tax (5%)</label>
                          <div className="totals-value" id="cart-tax">
                            {(taxRate * subTotal).toFixed(2)}
                          </div>
                        </div>
                        <div className="totals-item">
                          <label>Shipping</label>
                          <div className="totals-value" id="cart-shipping">
                            {(shippingRate).toFixed(2)}
                          </div>
                        </div>
                        <div className="totals-item totals-item-total">
                          <label>Grand Total</label>
                          <div className="totals-value" id="cart-total">
                            {(subTotal + taxRate * subTotal + shippingRate).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <Link href="/checkout">
                        <button className="checkout" onClick={handleCartUpdate}>Proceed To Checkout</button>
                      </Link>
                    </div>
                  </div>
                </div>
            }
          </>
        )}
      </div>
    </>
  )
}

export default Cart