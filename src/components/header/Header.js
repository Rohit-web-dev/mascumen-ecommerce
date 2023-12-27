"use client"
import React, { useState } from 'react';
import Image from 'next/image'
import headerImg from '../../../public/assets/images/mascumen.jpeg'
import Link from 'next/link'
import { FaBars } from "react-icons/fa6";
import Navbar from './Navbar';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Header = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  // -- sign in and sign up modal tab button --
  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

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
              <Navbar />
            </div>
          </div>
        </nav>
      </header>
      <div className="header-blank"></div>

      {/* -- signIn & signUp Modal -- */}
      <div className="modal fade" id="signIn" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
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
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active-tab' : 'hidden-tab'}`}>
                <Login />
              </div>
              <div id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active-tab' : 'hidden-tab'}`}>
                <Register />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header