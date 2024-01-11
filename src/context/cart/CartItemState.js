"use client"
import React, { useState, useEffect } from 'react';
import CartContext from './cartContext'
import { getCartData } from '@/appwrite/config';
import { roleID } from '@/appwrite/config';

const CartItemState = (props) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartData()
      .then((data) => {
        setCartItems(data?.filter(item => item.userId === roleID));
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  // Sum of the productItem values
  const totalProductItems = cartItems?.reduce((sum, item) => {
    return sum + item?.productItem;
  }, 0);

  useEffect(() => {
    console.log('Cart Items:', cartItems);
    console.log('Total Product Items:', totalProductItems);
  }, [cartItems, totalProductItems]);


  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalProductItems, updateCartItems: setCartItems }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartItemState;
