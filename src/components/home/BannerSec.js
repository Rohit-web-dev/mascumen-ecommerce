import Image from "next/image";
import Link from "next/link";
import "@/app/styles/style.css"
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import img3 from '../../../public/assets/images/product3.png'
import img4 from '../../../public/assets/images/product4.png'
import img5 from '../../../public/assets/images/product5.png'

const BannerSec = () => {
  return (
    <div className="main-banner" id="top">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 mb-3">
          <div className="left-content">
            <div className="thumb">
              <div className="inner-content">
                <h4>We Are Mascumen</h4>
                <span>Check Out all Our Products</span>
                <div className="main-border-button">
                  <Link href="#">Purchase Now!</Link>
                </div>
              </div>
              <Image src={img1} alt="altImg" width={100} height={100} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-content">
            <div className="row">
              <div className="col-lg-6">
                <div className="right-first-image">
                  <div className="thumb">
                    <div className="inner-content">
                      <h4>Shaving</h4>
                      <span>Shaving Creams+AfterShaves</span>
                    </div>
                    <div className="hover-content">
                      <div className="inner">
                        <h4>shaving</h4>
                        <div className="main-border-button">
                          <Link href="#">Discover More</Link>
                        </div>
                      </div>
                    </div>
                    <Image src={img2} alt="altImg" width={100}/>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-first-image">
                  <div className="thumb">
                    <div className="inner-content">
                      <h4>Skin</h4>
                      <span>Cleansers Scrubs & Masks</span>
                    </div>
                    <div className="hover-content">
                      <div className="inner">
                        <h4>Skin</h4>
                        <p>Shop the Look</p>
                        <div className="main-border-button">
                          <Link href="#">Discover More</Link>
                        </div>
                      </div>
                    </div>
                    <Image src={img5} alt="altImg" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-first-image">
                  <div className="thumb">
                    <div className="inner-content">
                      <h4>Body Washes,Bars& Lotions</h4>
                      <span>BodyWashes,Bars& Lotions</span>
                    </div>
                    <div className="hover-content">
                      <div className="inner">
                        <h4>Deodrants,Powders& Fragrance</h4>
                        <p>BodyHair& Nail Tools</p>
                        <div className="main-border-button">
                          <Link href="#">Discover More</Link>
                        </div>
                      </div>
                    </div>
                    <Image src={img3} alt="altImg" width={100} />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-first-image">
                  <div className="thumb">
                    <div className="inner-content">
                      <h4>Beards</h4>
                      <span>BeardWahes,Balms& oils</span>
                    </div>
                    <div className="hover-content">
                      <div className="inner">
                        <h4>Beard Oils</h4>
                        <p>Beard Tools& Kits</p>
                        <div className="main-border-button">
                          <Link href="#">Discover More</Link>
                        </div>
                      </div>
                    </div>
                    <Image src={img4} alt="altImg" width={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default BannerSec