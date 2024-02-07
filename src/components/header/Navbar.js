"use client"
import React, { useState, useEffect } from 'react';
import { FaCartArrowDown, FaHeart, FaUser, FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import appwriteService from '@/appwrite/config';
import { fetchCartData } from '@/redux/slice/cartSlice';
import { login, logout } from '@/redux/slice/authSlice';

const Navbar = ({ handleShow }) => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState();
  const cart = useSelector((state) => state.cart?.items)
  const [activeLink, setActiveLink] = useState('/');

  const handleActiveLink = (path) => {
    setActiveLink(path);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await appwriteService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          setCurrentUser(userData);
          setIsLoggedIn(true); // Update isLoggedIn state to true after successful login
        } else {
          dispatch(logout());
          setCurrentUser(null);
          setIsLoggedIn(false); // Update isLoggedIn state to false after logout
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(logout());
        setCurrentUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setIsLoggedIn(auth.status);
  }, [auth.status]);


  // -- cart item counting -- 
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    const roleID = auth?.userData?.$id;
    const fetchData = async () => {
      const filteredUser = cart.filter(item => item && item?.userId === roleID);
      setCartItems(filteredUser);
    };
    fetchData();
  }, [cart, auth]);


  // Sum of the productItem values
  const totalProductItems = cartItems?.reduce((sum, item) => {
    const userId = item?.userId;
    if (userId) {
      return sum + (item?.productItem || 0);
    } else {
      return sum;
    }
  }, 0);


  const handleLogout = async () => {
    try {
      await appwriteService.logout();
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      dispatch(logout());
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

      { isLoggedIn ?
        <li className="nav-item dropdown">
          <Link className="nav-link logged-user" href="/" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <FaRegUserCircle /><span>{auth?.userData?.name}</span>
          </Link>
          <ul className="dropdown-menu child-drop" aria-labelledby="userDropdown">
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
          <FaCartArrowDown /><sup>{totalProductItems}</sup></Link>
      </li>
    </ul>
  )
}

export default Navbar 