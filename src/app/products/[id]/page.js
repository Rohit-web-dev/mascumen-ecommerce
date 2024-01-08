"use client"
import { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import { FaCartPlus, FaWallet } from "react-icons/fa";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import img from '../../../../public/assets/images/products-page-heading.jpg'
import ProductCarouselSec from '@/components/home/ProductCarouselSec';
import Banner from '@/components/common/Banner';
import { fetchProducts, fetchProductDetailsById, addToCart, getCartData, roleID } from '@/appwrite/config';
import Loader from '@/app/loading';
import CommonToast from '@/components/common/CommonToast';

const ProductDetails = ({ params }) => {
  const id = params.id
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [cartData, setCartData] = useState([]);


  // -- click to show product img -- 
  const changeImage = (imageUrl) => {
    setMainImageUrl(imageUrl);
  };
  useEffect(() => {
    if (productDetails?.images?.length > 0) {
      setMainImageUrl(productDetails.images[0]);
    }
  }, [productDetails]);


  // -- fetch Product Details By Id --
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const details = await fetchProductDetailsById(id);
        setProductDetails(details);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);


  // -- get all similar products -- 
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);


  // -- desc show hide -- 
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const description = productDetails?.desc
  const truncatedText = typeof description === 'string' ? description.slice(0, 100) : description;
  const displayText = showMore ? description : truncatedText;
  const buttonText = showMore ? ' Show Less' : ' Show More';


  // discount percentage
  const percentageDiscount = ((productDetails?.oldprice - productDetails?.price) / productDetails?.oldprice) * 100;


  // -- ADD TO CART BUTTON --
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


  const responsiveLayout = [
    {
      breakpoint: 1024,
      cols: 5,
    },
    {
      breakpoint: 800,
      cols: 5,
    },
    {
      breakpoint: 600,
      cols: 4,
    },
  ]


  return (
    <>
      {/* -- banner --  */}
      <Banner
        Img={img}
        Title={"Product Details Page"}
        Para={"Shoes Speak Louder than Words"} />

      <div className="product-det-section">
        <div className="container">
          {loading && <Loader />}
          {!loading && (
            <div className="row">
              <div className="col-md-6 col-12 my-2">
                <div id="main-image-container">
                  <img id="main-image" src={mainImageUrl} alt="Main Image" />
                </div>
                <Carousel cols={5} rows={1} gap={10} responsiveLayout={responsiveLayout}>
                  {
                    productDetails?.images?.map((imageUrl, index) => (
                      <Carousel.Item key={index}>
                        <div className="item">
                          <div className="thumb">
                            <img src={imageUrl} alt={`Image ${index + 1}`} onClick={() => changeImage(imageUrl)} />
                          </div>
                        </div>
                      </Carousel.Item>
                    ))
                  }
                </Carousel>
                <div className="btn-groups">
                  <button type="button" onClick={() => handleCartClick(productDetails?.$id)} className="add-cart-btn"><FaCartPlus /> add to cart</button>
                  <button type="button" className="buy-now-btn"><FaWallet /> buy now</button>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="product-div-right">
                  <span className="product-name">{productDetails?.title}</span>
                  <p className="product-description">{displayText}
                    {description?.length > 100 && (
                      <span className="show-more" onClick={toggleShowMore}>
                        {buttonText}
                      </span>
                    )}
                  </p>
                  <p className="s-price">Special price</p>
                  <div className="special-price">
                    <span className="product-price">₹{productDetails?.price}</span>
                    <strike>₹{productDetails?.oldprice}</strike>
                    <h5 className="discount">{percentageDiscount.toFixed(2)}% OFF</h5>
                  </div>
                  <div className="pub-stars">
                    <h4>{productDetails?.rating} <FaStar className="star-icon" /></h4>
                    <a href="#reviewRating">952 Ratings, 198 Reviews •</a>
                  </div>
                  <p className="s-price">Product Details</p>
                  <div className="product-det">
                    <p>Name: <span>{productDetails?.title}</span></p>
                    <p>Material: <span>Soft Material</span></p>
                    <p>No. of Compartments: <span>22</span></p>
                    <p>Multipack: <span>3</span></p>
                    <p>Sizes: <span>{productDetails?.size}</span></p>
                    <p>Country of Origin: <span>India</span></p>
                    <p>Colour: <span>All Colour Available</span></p>
                  </div>
                  {/* <div className="review-rating" id="reviewRating">
                    <p className="s-price">Product Ratings & Reviews</p>
                    <div className="rating-div">
                      <div className="review-count">
                        <h4>3.5 <FaStar className="star-icon" /></h4>
                        <p>952 Ratings,</p>
                        <p>198 Reviews</p>
                      </div>
                      <div className="progress-section" data-aos="fade-left" data-aos-once="true">
                        <div className="task-progress">
                          <p>Excellent
                            <span>457</span>
                          </p>
                          <progress className="progress progress1" max="100" value="60"></progress>
                        </div>
                        <div className="task-progress">
                          <p>Very Good
                            <span>
                              174</span>
                          </p>
                          <progress className="progress progress2" max="100" value="30"></progress>
                        </div>
                        <div className="task-progress">
                          <p>Good
                            <span>135</span>
                          </p>
                          <progress className="progress progress3" max="100" value="25"></progress>
                        </div>
                        <div className="task-progress">
                          <p>Average
                            <span>68</span>
                          </p>
                          <progress className="progress progress4" max="100" value="10"></progress>
                        </div>
                        <div className="task-progress">
                          <p>Poor
                            <span>118</span>
                          </p>
                          <progress className="progress progress5" max="100" value="20"></progress>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="public-review">
                      <div className="d-flex align-items-center">
                        <div className="user-img">
                          <i className="fas fa-user"></i>
                        </div>
                        <p className="name">Rohit Kumar</p>
                      </div>
                      <div className="rating">
                        <div className="star">
                          4 <FaStar className="star-icon" />
                        </div>
                        <p className="time">• Posted on 08 Dec 2023</p>
                      </div>
                      <p className="desc">The 3number bag is so small and the teddy has also not come but the 1 and 2 bag is good
                      </p>
                      <div className="pub-img">
                        <Image src={img1} alt="altImg" />
                        <Image src={img1} alt="altImg" />
                        <Image src={img1} alt="altImg" />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* -- Similar Products --  */}
      <div className="container-fluid pt-5 ps-3"><h2 className="section-heading">Similar Products</h2></div>
      <ProductCarouselSec loading={loading} products={products} category={productDetails?.category} />

      {/* -- People also viewed --  */}
      <div className="container-fluid pt-5 ps-3"><h2 className="section-heading">People also viewed</h2></div>
      <ProductCarouselSec loading={loading} products={products} />
    </>
  )
}

export default ProductDetails