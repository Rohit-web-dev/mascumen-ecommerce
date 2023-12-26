import Image from 'next/image'
import { FaInstagram } from "react-icons/fa";
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import img3 from '../../../public/assets/images/product3.png'
import img4 from '../../../public/assets/images/product4.png'
import img5 from '../../../public/assets/images/product5.png'
import img6 from '../../../public/assets/images/product6.png'
import Link from 'next/link';

const data = [
  {
    id:1,
    name: "Fashion",
    img: img1
  },
  {
    id:2,
    name: "New",
    img: img2
  },
  {
    id:3,
    name: "Brand",
    img: img3
  },
  {
    id:4,
    name: "Makeup",
    img: img4
  },
  {
    id:5,
    name: "Leather",
    img: img5
  },
  {
    id:6,
    name: "Bag",
    img: img6
  }
]

const SocialMediaSec = () => {
  return (
    <section className="section" id="social">
      <div className="container-fluid">
        <div className="row images">
          {
            data.map((item) => (
              <div className="col-2" key={item?.id}>
                <div className="thumb">
                  <div className="icon">
                    <Link href="http://instagram.com">
                      <h6>{item?.name}</h6>
                      <FaInstagram className='inst' />
                    </Link>
                  </div>
                  <Image src={item?.img} alt={item?.name} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default SocialMediaSec