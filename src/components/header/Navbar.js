"use client"
import React, { useState, useEffect } from 'react';
import { FaCartArrowDown, FaHeart, FaUser, FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link'
import { getCartData, roleID } from '@/appwrite/config';
import appwriteService from '@/appwrite/config';

const Navbar = ({ handleShow, currentUser, isLoggedIn, setIsLoggedIn }) => {
  const [cartItems, setCartItems] = useState([]);
  const [activeLink, setActiveLink] = useState('/');
  const handleActiveLink = (path) => {
    setActiveLink(path);
  };

  // -- cart item counting -- 
  useEffect(() => {
    getCartData()
      .then((data) => {
        setCartItems(data?.filter(item => item.userId === roleID));
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  // // Sum of the productItem values
  // const totalProductItems = cartItems?.reduce((sum, item) => {
  //   return sum + item?.productItem;
  // }, 0);

  const handleLogout = async () => {
    try {
      await appwriteService.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className={`nav-link ${activeLink === '/' ? 'active' : ''}`} onClick={() => handleActiveLink('/')} href='/'>Home</Link>
      </li>
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</Link>
        <ul className="dropdown-menu child-drop" aria-labelledby="navbarDropdown">
          <li><Link className="dropdown-item" href='#'>Shaving</Link></li>
          <li><Link className="dropdown-item" href='#'>Body</Link></li>
          <li><Link className="dropdown-item" href='#'>Body Washes</Link></li>
          <li><Link className="dropdown-item" href='#'>Bars & Lotions</Link></li>
          <li><Link className="dropdown-item" href='#'>Beard</Link></li>
          <li><Link className="dropdown-item" href='#'>Brand</Link></li>
          <li><Link className="dropdown-item" href='#'>Deals</Link></li>
        </ul>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeLink === '/products' ? 'active' : ''}`} onClick={() => handleActiveLink('/products')} href='/products'>Products</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeLink === '/checkout' ? 'active' : ''}`} onClick={() => handleActiveLink('/checkout')} href='/checkout'>Checkout</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeLink === '/about' ? 'active' : ''}`} onClick={() => handleActiveLink('/about')} href='/about'>About Us</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${activeLink === '/contact' ? 'active' : ''}`} onClick={() => handleActiveLink('/contact')} href='/contact'>Contact Us</Link>
      </li>

      {isLoggedIn ?
        <li className="nav-item dropdown">
          <Link className="nav-link logged-user" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <FaRegUserCircle /><span>{currentUser?.name}</span>
          </Link>
          <ul className="dropdown-menu child-drop" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" href='#'>Profile</Link></li>
            <li><Link className="dropdown-item" href='#'>Setting</Link></li>
            <li><Link className="dropdown-item" href='#' onClick={handleLogout}>Logout</Link></li>
          </ul>
        </li>
        :
        <li className="login-sec nav-item">
          <Link className='nav-link user' href='' onClick={handleShow}><FaUser className='icon' /></Link>
        </li>
      }

      <li className="nav-item">
        <Link className={`nav-link user ${activeLink === '/wishlist' ? 'active' : ''}`} onClick={() => handleActiveLink('/wishlist')} href='/wishlist'><FaHeart /></Link>
      </li>
      <li className="cart nav-item">
        <Link className={`nav-link user ${activeLink === '/cart' ? 'active' : ''}`} onClick={() => handleActiveLink('/cart')} href='/cart'>
          <FaCartArrowDown />{cartItems.length === 0 ? "" : <sup>&#8226;</sup>}</Link>
      </li>
    </ul>
  )
}

export default Navbar 