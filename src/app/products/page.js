"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import "@/app/styles/style.css"
import { FaEye, FaStar, FaCartPlus, FaSearch } from "react-icons/fa";
import img from '../../../public/assets/images/products-page-heading.jpg'
import Banner from '@/components/common/Banner';
import { fetchProducts } from '@/appwrite/config';

const Products = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  // Filtered and paginated data
  const itemsPerPage = 4;
  const filteredData = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <div key={item?.$id} className="col-lg-3 col-md-6 my-1">
                <div className="item">
                  <div className="thumb">
                    <div className="hover-content">
                      <ul>
                        <li><Link href={`products/${item?.$id}`}><FaEye className="icon" /></Link></li>
                        <li><Link href="/"><FaStar className="icon" /></Link></li>
                        <li><Link href="cart"><FaCartPlus className="icon" /></Link></li>
                      </ul>
                    </div>
                    <img src={item?.img} />
                  </div>
                  <div className="down-content">
                    <h4>{item?.title}</h4>
                    <div className="d-flex justify-content-between">
                      <span>${item?.price}</span>
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