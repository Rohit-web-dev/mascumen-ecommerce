"use client"
import Image from "next/image";
import Link from "next/link";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import { FaEye, FaStar, FaCartPlus } from "react-icons/fa";
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import img3 from '../../../public/assets/images/product3.png'
import img4 from '../../../public/assets/images/product4.png'
import img5 from '../../../public/assets/images/product5.png'
import img6 from '../../../public/assets/images/product6.png'
import img7 from '../../../public/assets/images/product7.png'
import img8 from '../../../public/assets/images/product8.png'
import img9 from '../../../public/assets/images/product9.png'
import img10 from '../../../public/assets/images/product10.png'


const data = [
  {
    id: 1,
    img: img1,
    name: "Shaving Creams+Soaps",
    price: '$120.00'
  },
  {
    id: 2,
    img: img2,
    name: "Shaving Irritation Relief",
    price: '$200.00'
  },
  {
    id: 3,
    img: img3,
    name: "Face Washes",
    price: '$300.00'
  },
  {
    id: 4,
    img: img4,
    name: "Face Scrubs",
    price: '$400.00'
  },
  {
    id: 5,
    img: img5,
    name: "Aftershave Balms+Splashes",
    price: '$500.00'
  },
  {
    id: 6,
    img: img6,
    name: "Acne and Oily Solutions",
    price: '$600.00'
  },
  {
    id: 7,
    img: img7,
    name: "BodyWashers& Showergels",
    price: '$700.00'
  },
  {
    id: 8,
    img: img8,
    name: "Body Bars and Scrubs",
    price: '$800.00'
  },
  {
    id: 9,
    img: img9,
    name: "Body Wipes& Pads",
    price: '$900.00'
  },
  {
    id: 10,
    img: img10,
    name: "Men Hair Light Beard Oil",
    price: '$1000.00'
  },
]


const ProductCarouselSec = () => {

  const responsiveLayout = [
    {
      breakpoint: 1024,
      cols: 4,
    },
    {
      breakpoint: 800,
      cols: 3,
    },
  ]

  return (
    <>
      <section className="section products-carousel">
        <Carousel cols={5} rows={1} gap={10} responsiveLayout={responsiveLayout}>
          {
            data.map((item) => (
              <Carousel.Item key={item?.id}>
                <div className="item">
                  <div className="thumb">
                    <div className="hover-content">
                      <ul>
                        <li><Link href={`products/${item?.id}`}><FaEye className="icon" /></Link></li>
                        <li><Link href="/"><FaStar className="icon" /></Link></li>
                        <li><Link href="cart"><FaCartPlus className="icon" /></Link></li>
                      </ul>
                    </div>
                    <Image src={item?.img} alt={item?.name} />
                  </div>
                  <div className="down-content">
                    <h4>{item?.name}</h4>
                    <div className="d-flex justify-content-between">
                      <span>{item?.price}</span>
                      <ul className="stars">
                        <li><FaStar className="icon" /></li>
                        <li><FaStar className="icon" /></li>
                        <li><FaStar className="icon" /></li>
                        <li><FaStar className="icon" /></li>
                        <li><FaStar className="icon" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))
          }
        </Carousel>

      </section>
    </>
  )
}

export default ProductCarouselSec