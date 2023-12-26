"use client"
import { useState, useEffect } from 'react';
import "@/app/styles/style.css"
import { FaTrashAlt } from "react-icons/fa";
import img from '../../../public/assets/images/products-page-heading.jpg'
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import Image from 'next/image'
import Banner from '@/components/common/Banner';

const Cart = () => {
  const taxRate = 0.05;
  const shippingRate = 15.0;
  const fadeTime = 300;
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      img: img1,
      title: 'Hair Black Light Oil',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, error minima alias corrupti dignissimos aliquid molestiae esse fugiat dolorum iste voluptatibus earum culpa ab aspernatur?',
      price: 12.99,
      quantity: 1
    },
    {
      id: 2,
      img: img2,
      title: 'Nutro™ Beard Oil Light',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium aspernatur velit veniam vitae reiciendis deserunt debitis?',
      price: 45.99,
      quantity: 1
    },
  ]);

  useEffect(() => {
    recalculateCart();
  }, [cartItems]);

  /* Increment quantity */
  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /* Decrement quantity */
  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  /* Remove item from cart */
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /* Recalculate cart */
  const recalculateCart = () => {
    let subtotal = 0;
    /* Sum up row totals */
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    /* Calculate totals */
    const tax = subtotal * taxRate;
    const shipping = subtotal > 0 ? shippingRate : 0;
    const total = subtotal + tax + shipping;

    /* Update totals display */
    document.getElementById('cart-subtotal').innerHTML = subtotal.toFixed(2);
    document.getElementById('cart-tax').innerHTML = tax.toFixed(2);
    document.getElementById('cart-shipping').innerHTML = shipping.toFixed(2);
    document.getElementById('cart-total').innerHTML = total.toFixed(2);
  };

  return (
    <>
      {/* -- banner --  */}
      <Banner
        Img={img}
        Title={"Check Our Products"}
        Para={"Style is way to say who you are without having to speak"}
      />

      <div className="cart-page container-fluid pt-5">
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
                {
                  cartItems.map((item) => (
                    <div className="product" key={item?.id}>
                      <div className="product-image">
                        <Image src={item?.img} alt="altImg" />
                      </div>
                      <div className="product-details">
                        <div className="product-title">{item?.title}</div>
                        <p className="product-description">{item?.desc}</p>
                      </div>
                      <div className="product-price">{item?.price}</div>
                      <div className="product-quantity">
                        <button onClick={() => decrementQuantity(item.id)}>-</button>
                        <input type="text" value={item.quantity} readOnly />
                        <button onClick={() => incrementQuantity(item.id)}>+</button>
                      </div>
                      <div className="product-removal">
                        <button className="remove-product" onClick={() => removeItem(item.id)}>
                          <FaTrashAlt className="trash-icon" />
                        </button>
                      </div>
                      <div className="product-line-price">
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                }
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
                  <div className="totals-value" id="cart-subtotal">71.97</div>
                </div>
                <div className="totals-item">
                  <label>Tax (5%)</label>
                  <div className="totals-value" id="cart-tax">3.60</div>
                </div>
                <div className="totals-item">
                  <label>Shipping</label>
                  <div className="totals-value" id="cart-shipping">15.00</div>
                </div>
                <div className="totals-item totals-item-total">
                  <label>Grand Total</label>
                  <div className="totals-value" id="cart-total">90.57</div>
                </div>
              </div>
              <button className="checkout">Proceed To Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart