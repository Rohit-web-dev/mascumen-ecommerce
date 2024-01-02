"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import "@/app/styles/style.css"
import { FaEye, FaStar, FaCartPlus, FaSearch } from "react-icons/fa";
import img from '../../../public/assets/images/products-page-heading.jpg'
import Banner from '@/components/common/Banner';
import { fetchProducts } from '@/appwrite/config';
import Loader from '../loading';
import PriceRangeFilter from '@/components/common/PriceRangeFilter';

const Products = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Set filteredProducts initially to all products

        // Extract unique categories from the products
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
    setSelectedCategory("All Categories"); // Set the default category
  }, []);


  // -- product rating color -- 
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? '#fe696a' : '#a1a1a1';
      stars?.push(<FaStar key={i} className="star-icon" style={{ color: starColor }} />);
    }
    return stars;
  };





  const handleFilterChange = (priceRange) => {
    // Apply the price range filter to the products
    const filtered = products.filter((product) => {
      const price = parseFloat(product.price);
      return price >= priceRange.min && price <= priceRange.max;
    });
    // Update the state with the filtered products
    setFilteredProducts(filtered);
  };


  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    const filtered = selectedCategory !== "All Categories"
      ? products.filter((product) => product.category === selectedCategory)
      : products;
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };




  // Filtered and paginated data
  const itemsPerPage = 12;
  const filteredData = filteredProducts.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous and Next button handlers
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredData.length / itemsPerPage))
    );
  };

  const handleFirstClick = () => {
    setCurrentPage(1);
  };

  const handleLastClick = () => {
    setCurrentPage(Math.ceil(filteredData.length / itemsPerPage));
  };


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
        <div className="container-fluid">
          <div className="row">
            {/* Search filter */}
            <div className="col-lg-2 col-md-4 col-5 mb-3">
              <div className='filter'>
                <h5 className='filter-head'>Filter</h5>
                <div className='product-searching'>
                  <input
                    type="search"
                    placeholder="Search for products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="search-icon" />
                </div>

                <div className='filter-divider'></div>
                <h5 className='filter-heading'>Category</h5>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="All Categories">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <div className='filter-divider'></div>
                <h5 className='filter-heading'>Brand</h5>
                <select
                  className="form-select"
                  aria-label="Default select example"
                // onChange={(e) => handleBrandChange(e.target.value)}
                >
                  <option value="All Brands">All Brands</option>
                  {/* {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))} */}
                </select>

                <div className='filter-divider'></div>
                <h5 className='filter-heading'>Price</h5>
                <PriceRangeFilter onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* products */}
            <div className="col-lg-10 col-md-8 col-7 mb-3">
              <div className="row">
                {loading && <Loader />}
                {!loading && (
                  <>
                    {/* Display products */}
                    {currentItems.map((item) => (
                      <div key={item?.$id} className="col-lg-3 col-md-6 my-1">
                        <div className="item">
                          <div className="thumb">
                            <div className="hover-content">
                              <ul>
                                <li><Link href={`/products/${item?.$id}`}><FaEye className="icon" /></Link></li>
                                <li><Link href="/wishlist"><FaStar className="icon" /></Link></li>
                                <li><Link href="/cart"><FaCartPlus className="icon" /></Link></li>
                              </ul>
                            </div>
                            <img src={item?.img} />
                          </div>
                          <div className="down-content">
                            <h4>{item?.title}</h4>
                            <div className="d-flex justify-content-between">
                              <span>₹{item?.price}</span>
                              <ul className="stars">
                                <li>{renderStars(item?.rating)}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <div className="col-lg-12">
                  <div className="pagination">
                    <ul>
                      <li><a onClick={handleFirstClick}>&lt;&lt;</a></li>
                      <li><a onClick={handlePrevClick}>&lt;</a></li>
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
                      <li><a onClick={handleNextClick}>&gt;</a></li>
                      <li><a onClick={handleLastClick}>&gt;&gt;</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Products