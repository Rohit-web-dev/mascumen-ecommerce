"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import "@/app/styles/style.css"
import { FaEye, FaStar, FaCartPlus, FaSearch, FaHeart } from "react-icons/fa";
import img from '../../../public/assets/images/products-page-heading.jpg'
import Banner from '@/components/common/Banner';
import { fetchProducts, addToCart, addToWishlist, getCartData, getWishlistData, roleID } from '@/appwrite/config';
import Loader from '../loading';
import PriceRangeFilter from '@/components/common/PriceRangeFilter';
import CommonToast from '@/components/common/CommonToast';


const Products = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);


  // ------------------------------------------------------------------------------
  //  ********************* API CALL ***********************
  // ------------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Set filteredProducts initially to all products
        // Extract unique categories and brands from the products
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        const uniqueBrands = [...new Set(data.map(product => product.brand))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchData();
    setSelectedCategory("All Categories"); // Set the default category
  }, []);



  // ------------------------------------------------------------------------------
  //  ********************* Filter Category, Brand, Price And Clear All ***********************
  // ------------------------------------------------------------------------------

  // Update brands whenever the selected category changes
  useEffect(() => {
    if (selectedCategory === "All Categories") {
      // If all categories are selected, show all brands
      const allBrands = [...new Set(products.map(product => product.brand))];
      setBrands(allBrands);
    } else {
      // Filter products based on the selected category
      const filteredByCategory = products.filter(product => product.category === selectedCategory);
      // Extract unique brands from the filtered products
      const uniqueBrands = [...new Set(filteredByCategory.map(product => product.brand))];
      setBrands(uniqueBrands);
    }
    // Reset selected brand and price range when the category changes
    setSelectedBrand("All Brands");
    setSelectedPriceRange(null);
  }, [selectedCategory, products]);



  // Update price ranges whenever the selected category, brand, or products change
  useEffect(() => {
    // Filter products based on the selected category and brand
    const filteredProductsByCategoryAndBrand =
      selectedCategory === "All Categories" && selectedBrand === "All Brands"
        ? products
        : selectedCategory === "All Categories"
          ? products.filter(product => product.brand === selectedBrand)
          : selectedBrand === "All Brands"
            ? products.filter(product => product.category === selectedCategory)
            : products.filter(
              product => product.category === selectedCategory && product.brand === selectedBrand
            );
    // Extract unique price ranges from the filtered products
    const uniquePriceRanges = [...new Set(filteredProductsByCategoryAndBrand.map(product => product.price))];
    const sortedUniquePriceRanges = uniquePriceRanges.sort((a, b) => a - b);
    // Create an array of objects with min and max values for each price range
    const formattedPriceRanges = sortedUniquePriceRanges.map((price, index) => ({
      id: index,
      min: price,
      max: sortedUniquePriceRanges[index + 1] || price, // Use the same value for max if it's the last range
    }));
    setPriceRanges(formattedPriceRanges);
  }, [selectedCategory, selectedBrand, products]);



  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    const filtered = selectedCategory !== "All Categories"
      ? products.filter((product) => product.category === selectedCategory)
      : products;
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };



  const handleBrandChange = (selectedBrand) => {
    setSelectedBrand(selectedBrand);
    // Apply brand and category filters
    const filtered = selectedBrand !== "All Brands"
      ? products.filter((product) =>
        product.brand === selectedBrand && (selectedCategory === "All Categories" || product.category === selectedCategory)
      )
      : selectedCategory !== "All Categories"
        ? products.filter((product) => product.category === selectedCategory)
        : products;
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };



  const handlePriceRangeChange = (priceRange) => {
    // Apply price range filter
    const filtered = priceRange
      ? filteredProducts.filter(
        (product) =>
          parseFloat(product.price) >= priceRange.min &&
          parseFloat(product.price) <= priceRange.max
      )
      : selectedBrand !== "All Brands"
        ? products.filter((product) =>
          product.brand === selectedBrand && (selectedCategory === "All Categories" || product.category === selectedCategory)
        )
        : selectedCategory !== "All Categories"
          ? products.filter((product) => product.category === selectedCategory)
          : products;
    setFilteredProducts(filtered);
    setSelectedPriceRange(priceRange); // Set selectedPriceRange to null when clearing filters
    setCurrentPage(1); // Reset page to 1 when changing the filter
  };


  // -- clear all filter button --  
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedBrand('All Brands');
    setSelectedPriceRange(null);
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
    // Refetch products or apply initial filtering logic here
    setFilteredProducts(products);
  };


  // ------------------------------------------------------------------------------
  //  ********************* product rating color ***********************
  // ------------------------------------------------------------------------------

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? '#fe696a' : '#a1a1a1';
      stars?.push(<FaStar key={i} className="star-icon" style={{ color: starColor }} />);
    }
    return stars;
  };


  // ------------------------------------------------------------------------------
  //  ********************* Data Pagination ***********************
  // ------------------------------------------------------------------------------

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


  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //                            ADD TO Cart
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // -- get cart data --
  useEffect(() => {
    getCartData()
      .then((data) => {
        setCartData(data?.filter(item => item.userId === roleID));
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const handleCartClick = async (clickedItemId) => {
    if (roleID === '') {
      CommonToast("error", "You are not logged in user");
    } else {
      const isItemInCart = cartData?.some((item) => item?.ecommerceWebProducts[0]?.$id === clickedItemId);
      if (isItemInCart) {
        CommonToast("error", "Product already in the cart");
      } else {
        await addToCart(clickedItemId, roleID, 1);
        try {
          const updatedCartData = await getCartData();
          setCartData(updatedCartData?.filter(item => item.userId === roleID));
          CommonToast("success", "Product Added To Cart");
        } catch (error) {
          console.error('Error fetching updated cart data:', error);
        }
      }
    }
  };



  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //                            ADD TO Wishlist
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // -- get cart data --
  useEffect(() => {
    getWishlistData()
      .then((data) => {
        setWishlistData(data?.filter(item => item.userId === roleID));
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
      });
  }, []);


  const handleWishlistClick = async (clickedItemId) => {
    if (roleID === '') {
      CommonToast("error", "You are not logged in user");
    } else {
      const isItemInCart = wishlistData?.some((item) => item?.ecommerceWebProducts[0]?.$id === clickedItemId);
      if (isItemInCart) {
        CommonToast("error", "Product already in the wishlist");
      } else {
        await addToWishlist(clickedItemId, roleID, 1);
        try {
          const updatedWishlistData = await getWishlistData();
          setWishlistData(updatedWishlistData?.filter(item => item.userId === roleID));
          CommonToast("success", "Product Added To Wishlist");
        } catch (error) {
          console.error('Error fetching updated cart data:', error);
        }
      }
    }
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
                <div className='clear-head'>
                  <h5 className='filter-head'>Filter</h5>
                  <button onClick={handleResetFilters}>Clear All</button>
                </div>
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
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                >
                  <option value="All Brands">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <div className='filter-divider'></div>
                <h5 className='filter-heading'>Price</h5>
                <PriceRangeFilter
                  selectedPriceRange={selectedPriceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
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
                                <li><a onClick={() => handleWishlistClick(item?.$id)}><FaHeart className="icon" /></a></li>
                                <li><a onClick={() => handleCartClick(item?.$id)}><FaCartPlus className="icon" /></a></li>
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