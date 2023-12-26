"use client"
import React, { useState } from 'react';
import Image from 'next/image'
import footerImg from '../../../public/assets/images/mascumen.jpeg'
import { MdKeyboardDoubleArrowRight, MdLocationOn, MdOutlineMail, MdLocalPhone } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaBehance } from "react-icons/fa";
import Link from 'next/link';
import CommonModal from '../common/CommonModal';
import RefundPolicy from '../allTerms/RefundPolicy';
import DeliveryPolicy from '../allTerms/DeliveryPolicy';
import PrivacyPolicy from '../allTerms/PrivacyPolicy';
import TermCondition from '../allTerms/TermCondition';
import Faq from '../allTerms/Faq';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [dynamicContentGenerator, setDynamicContentGenerator] = useState(null);

  const handleOpenModal = (title, contentGenerator) => {
    setModalTitle(title);
    setDynamicContentGenerator(() => contentGenerator);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalTitle('');
    setDynamicContentGenerator(null);
    setShowModal(false);
  };


  return (
    <>
      <footer className="mt-2">
        <div className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 col-12 my-2">
                <div className="footer-logo">
                  <Image src={footerImg} alt='altImg' />
                </div>
                <p className="mt-3"><MdLocationOn /> 16501 Collins Ave, Sunny Isles Beach, FL 33160, United
                  States</p>
                <ul>
                  <li><Link href="#"><MdOutlineMail /> mascumen@company.com</Link></li>
                  <li><Link href="#"><MdLocalPhone /> 010-020-0340</Link></li>
                </ul>
                <ul className="social-icon">
                  <li><Link href="#"><FaFacebookF className='icon' /></Link></li>
                  <li><Link href="#"><FaTwitter className='icon' /></Link></li>
                  <li><Link href="#"><FaLinkedinIn className='icon' /></Link></li>
                  <li><Link href="#"><FaBehance className='icon' /></Link></li>
                </ul>
              </div>
              <div className="col-1"></div>
              <div className="col-md-3 col-12 my-2">
                <h4>Shopping &amp; Categories</h4>
                <ul>
                  <li><Link href="#"><MdKeyboardDoubleArrowRight /> shaving Shopping</Link></li>
                  <li><Link href="#"><MdKeyboardDoubleArrowRight /> skin Shopping</Link></li>
                  <li><Link href="#"><MdKeyboardDoubleArrowRight /> BodyWashes Shopping</Link></li>
                </ul>
              </div>
              <div className="col-md-2 col-12 my-2">
                <h4>Useful Links</h4>
                <ul>
                  <li><Link href="/"><MdKeyboardDoubleArrowRight /> Home</Link></li>
                  <li><Link href="/about"><MdKeyboardDoubleArrowRight /> About Us</Link></li>
                  <li><button
                    onClick={() =>
                      handleOpenModal("Faq's", () => (
                        <>
                          <Faq />
                        </>
                      ))
                    }
                  ><MdKeyboardDoubleArrowRight /> FAQ's</button></li>
                  <li><Link href="/contact"><MdKeyboardDoubleArrowRight /> Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-md-3 col-12 my-2">
                <h4>Help &amp; Information</h4>
                <ul>
                  <li><button
                    onClick={() =>
                      handleOpenModal('Refund Policy', () => (
                        <>
                          <RefundPolicy />
                        </>
                      ))
                    }
                  ><MdKeyboardDoubleArrowRight /> Refund Policy</button></li>
                  <li><button
                    onClick={() =>
                      handleOpenModal('Delivery Policy', () => (
                        <>
                          <DeliveryPolicy />
                        </>
                      ))
                    }
                  ><MdKeyboardDoubleArrowRight /> Delivery Policy</button></li>
                  <li><button
                    onClick={() =>
                      handleOpenModal('Privacy Policy', () => (
                        <>
                          <PrivacyPolicy />
                        </>
                      ))
                    }
                  ><MdKeyboardDoubleArrowRight /> Privacy Policy</button></li>
                  <li><button
                    onClick={() =>
                      handleOpenModal('Term & Condition', () => (
                        <>
                          <TermCondition />
                        </>
                      ))
                    }
                  ><MdKeyboardDoubleArrowRight /> Terms & Conditions</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <p className="copyright">Copyright © 2023 mascumen Co., Ltd. All Rights Reserved.</p>
      </footer>

      {/* -- dynamic modal box for all terms --  */}
      <CommonModal
        showModal={showModal}
        handleClose={handleCloseModal}
        modalTitle={modalTitle}
        modalBody={dynamicContentGenerator && dynamicContentGenerator()}
      />
    </>
  )
}

export default Footer