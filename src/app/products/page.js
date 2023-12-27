"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import "@/app/styles/style.css"
import { FaEye, FaStar, FaCartPlus, FaSearch } from "react-icons/fa";
import img from '../../../public/assets/images/products-page-heading.jpg'
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
import Image from 'next/image';
import Banner from '@/components/common/Banner';
import { account, fetchProductData  } from '../../appwrite/config'

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

const Products = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filtered and paginated data
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);







  useEffect(() => {
    console.log(process.env.NEXT_APPWRITE_URL);
  }, []);

  const [product, setProduct] = useState(null);

  const fetchDataAndDoSomething = async () => {
    try {
      const productData = await fetchProductData('658a5a2edc47302eb5d2', '658a5b48aa285b17681b', 'documentId');
      console.log("Product data:", productData);
      // Do something with the product data
    } catch (error) {
      // Handle error
    }
  };
  
  fetchDataAndDoSomething();

  console.log(product);


  return (
    <>
      {/* -- banner --  */}
      <Banner
        Img={img}
        Title={"Check Our Products"}
        Para={"Style is way to say who you are without having to speak"} />

      <section className="section products-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="section-heading">Our Latest Products</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* Search input */}
            <div className="col-lg-12 mb-3">
              <div className='product-searching'>
                <input
                  type="search"
                  placeholder="Search for products, brand and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div>
            </div>

            {/* Display products */}
            {currentItems.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6 my-1">
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
              </div>
            ))}

            {/* Pagination */}
            <div className="col-lg-12">
              <div className="pagination">
                <ul>
                  {Array.from({
                    length: Math.ceil(filteredData.length / itemsPerPage),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={currentPage === index + 1 ? 'active' : ''}
                    >
                      <a onClick={() => paginate(index + 1)}>{index + 1}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Products