"use client"
import React, { useState } from 'react';
import Image from 'next/image'
import headerImg from '../../../public/assets/images/mascumen.jpeg'
import Link from 'next/link'
import { FaBars } from "react-icons/fa6";
import Navbar from './Navbar';

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
              <form id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active-tab' : 'hidden-tab'}`}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter Email" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password" />
                </div>
                <p className="note">*Note: You don't have account please click the signup button</p>
                <div className="d-flex justify-content-end py-3">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn signIn">SignIn</button>
                </div>
              </form>

              <form id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active-tab' : 'hidden-tab'}`}>
                <div className="mb-3">
                  <label for="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter Full Name" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter Email" autoComplete='off' />
                </div>
                <div className="mb-3">
                  <label for="phone" className="form-label">Phone</label>
                  <input type="number" className="form-control" id="phone" placeholder="Enter Phone Number" />
                </div>
                <div className="mb-3">
                  <label for="pass" className="form-label">Password</label>
                  <input type="password" className="form-control" id="pass" placeholder="Enter Password" autoComplete='off' />
                </div>
                <div className="mb-3">
                  <label for="cpass" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="cpass" placeholder="Enter Confirm Password" />
                </div>
                <div className="d-flex justify-content-end py-3">
                  <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn signIn">SignUp</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header