import Image from 'next/image'
import { FaQuoteLeft } from "react-icons/fa";
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import img3 from '../../../public/assets/images/product3.png'
import img4 from '../../../public/assets/images/product4.png'

const ExploreProductSec = () => {
  return (
    <section className="section" id="explore">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-lg-6 my-2">
            <div className="left-content">
              <h2 className="section-heading">Explore Our Products</h2>
              <span>DISCOVER YOUR STYLE</span>
              <div className="quote">
                <FaQuoteLeft className="icon" />
                <p>STYLE is a way to say WHO YOU ARE without having to SPEAK</p>
              </div>
              <p>Discover your personal Style with our Premium Clothing Collection.</p>
              <p>Welcome to on Point,Your Ultimate Fashion Destination .We are all about helping you express your unique
                style with Confidence.Our Carefully Curated Collections,Expert Fashion Tips,and Exceptional Customer
                Service Ensure you will always stay on point.</p>
              <div className="main-border-button">
                <a href="products.html">Discover More</a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 my-2">
            <div className="right-content">
              <div className="row">
                <div className="col-lg-6 my-2">
                  <div className="leather">
                    <Image src={img1} alt="altImg" />
                  </div>
                </div>
                <div className="col-lg-6 my-2">
                  <div className="first-image">
                    <Image src={img2} alt="altImg" />
                  </div>
                </div>
                <div className="col-lg-6 my-2">
                  <div className="second-image">
                    <Image src={img3} alt="altImg" />
                  </div>
                </div>
                <div className="col-lg-6 my-2">
                  <div className="types">
                    <Image src={img4} alt="altImg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreProductSec