"use client"
import { useEffect } from 'react';
import "@/app/styles/style.css"
import Image from "next/image"
import { FaQuoteLeft, FaFacebookF, FaTwitter, FaLinkedinIn, FaBehance } from "react-icons/fa";
import img from '../../../public/assets/images/products-page-heading.jpg'
import img1 from '../../../public/assets/images/product1.png'
import Banner from "@/components/common/Banner"
import Link from "next/link";
import OurTeam from "@/components/about/OurTeam";
import OurServices from "@/components/about/OurServices";
import SubscribeSec from "@/components/home/SubscribeSec";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slice/productsSlice";

const About = () => {

  const dispatch = useDispatch()
  const state = useSelector((state) => state.products.data)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("State", state?.[0]?.categories?.[0]?.name);

  return (
    <>
      {/* -- banner --  */}
      <Banner
        Img={img}
        Title={"About Our Company"}
        Para={"Awesome Products for you"} />

      <div className="about-us">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-4 col-md-6 my-2">
              <div className="left-image">
                <Image src={img1} alt="altImg" />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 my-2">
              <div className="right-content">
                <h4>About Us </h4>
                <span>STYLE is a way to say WHO YOU ARE without having to SPEAK</span>
                <div className="quote">
                  <FaQuoteLeft className="icon" />
                  <p>Discover your personal Style with our Premium Clothing Collection.</p>
                </div>
                <p>Welcome to on Point,Your Ultimate Fashion Destination .We are all about helping you express your unique
                  style with Confidence.Our Carefully Curated Collections,Expert Fashion Tips,and Exceptional Customer
                  Service Ensure you will always stay on point.</p>
                <ul>
                  <li><Link href="#"><FaFacebookF className='icon' /></Link></li>
                  <li><Link href="#"><FaTwitter className='icon' /></Link></li>
                  <li><Link href="#"><FaLinkedinIn className='icon' /></Link></li>
                  <li><Link href="#"><FaBehance className='icon' /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- our team -- */}
      <OurTeam />

      {/* -- our services -- */}
      <OurServices />

      {/* -- subscribe sec -- */}
      <SubscribeSec />

    </>
  )
}

export default About