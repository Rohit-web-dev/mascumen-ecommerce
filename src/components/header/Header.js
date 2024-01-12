"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import headerImg from '../../../public/assets/images/mascumen.jpeg'
import Link from 'next/link'
import { FaBars } from "react-icons/fa6";
import Navbar from './Navbar';
import Login from '../auth/Login';
import Register from '../auth/Register';
import appwriteService from '@/appwrite/config';
import { Modal } from 'react-bootstrap';


const Header = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // -- sign in and sign up modal tab button --
  const showTab = (tabId) => {
    setActiveTab(tabId);
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await appwriteService.getCurrentUser();
        setCurrentUser(users);
        const loggedIn = await appwriteService.isLoggedIn();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);


  return (
    <>
      <header className='fixed-top'>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image src={headerImg} alt='altImg' />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <FaBars className="toggler-icon" />
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <Navbar handleShow={handleShow} currentUser={currentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
        </nav>
      </header>
      <div className="header-blank"></div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div className="d-flex">
            <button
              onClick={() => showTab('tab1')}
              className={`tab-button me-4 ${activeTab === 'tab1' ? 'active-tab-button' : ''}`}
            >Sign In</button>
            <button
              onClick={() => showTab('tab2')}
              className={`tab-button ${activeTab === 'tab2' ? 'active-tab-button' : ''}`}
            >Sign Up</button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active-tab' : 'hidden-tab'}`}>
            <Login handleClose={handleClose} />
          </div>
          <div id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active-tab' : 'hidden-tab'}`}>
            <Register handleClose={handleClose} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Header