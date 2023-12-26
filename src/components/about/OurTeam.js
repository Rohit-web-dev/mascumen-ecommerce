import "@/app/styles/style.css"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaBehance } from "react-icons/fa";
import Image from "next/image"
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import img3 from '../../../public/assets/images/product3.png'
import Link from "next/link"

const data = [
  {
    id: 1,
    img: img1,
    name: "Priyanka",
    role: 'Product Caretaker'
  },
  {
    id: 2,
    img: img2,
    name: "Jessica",
    role: 'Product Caretaker'
  },
  {
    id: 3,
    img: img3,
    name: "Hannah",
    role: 'Product Caretaker'
  },
]

const OurTeam = () => {
  return (
    <section className="our-team">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 my-2">
            <div className="text-center pb-5">
              <h2 className="section-heading">Our Amazing Team</h2>
              <span className="section-para">Details to details is what makes Mascumen different from the others.</span>
            </div>
          </div>
          {
            data.map((item) => (
              <div className="col-lg-4 col-md-6 my-2">
                <div className="team-item">
                  <div className="thumb">
                    <div className="hover-effect">
                      <div className="inner-content">
                        <ul>
                          <li><Link href="#"><FaFacebookF className='icon' /></Link></li>
                          <li><Link href="#"><FaTwitter className='icon' /></Link></li>
                          <li><Link href="#"><FaLinkedinIn className='icon' /></Link></li>
                          <li><Link href="#"><FaBehance className='icon' /></Link></li>
                        </ul>
                      </div>
                    </div>
                    <Image src={item.img} alt={item.name} />
                  </div>
                  <div className="down-content">
                    <h4>{item.name}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default OurTeam