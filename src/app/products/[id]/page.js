"use client"
import { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import "@/app/styles/style.css"
import Carousel from 'better-react-carousel'
import Image from "next/image"
import img from '../../../../public/assets/images/products-page-heading.jpg'
import img1 from '../../../../public/assets/images/product1.png'
import img2 from '../../../../public/assets/images/product2.png'
import img3 from '../../../../public/assets/images/product3.png'
import img4 from '../../../../public/assets/images/product4.png'
import img5 from '../../../../public/assets/images/product5.png'
import img6 from '../../../../public/assets/images/product6.png'
import ProductCarouselSec from '@/components/home/ProductCarouselSec';
import Banner from '@/components/common/Banner';
import { fetchProducts, fetchProductDetails } from '@/appwrite/config';

const data = [
  {
    id: 1,
    img: img1,
  },
  {
    id: 2,
    img: img2,
  },
  {
    id: 3,
    img: img3,
  },
  {
    id: 4,
    img: img4,
  },
  {
    id: 5,
    img: img5,
  },
  {
    id: 6,
    img: img6,
  }
]

const ProductDetails = ({ params }) => {
  const id = params?.id
  const [mainImageUrl, setMainImageUrl] = useState(img1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const changeImage = (imageUrl) => {
    setMainImageUrl(imageUrl);
  };

  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    console.log('Current id:', id); // Log the current value of id

    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetchProductDetails(id);
          console.log('Response from fetchProductDetails:', response); // Log the response
          setProductDetails(response);
          // Set main image or perform other operations based on the fetched data
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  console.log(productDetails);

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
      breakpoint: 300,
      cols: 5,
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
          <div className="row">
            <div className="col-md-6 col-12 my-2">
              <div id="main-image-container">
                <Image id="main-image" src={mainImageUrl} alt="Main Image" />
              </div>
              <Carousel cols={5} rows={1} gap={10} responsiveLayout={responsiveLayout}>
                {
                  data.map((item) => (
                    <Carousel.Item key={item?.id}>
                      <div className="item">
                        <div className="thumb">
                          <Image src={item?.img} alt={item?.name} onClick={() => changeImage(item?.img)} />
                        </div>
                      </div>
                    </Carousel.Item>
                  ))
                }
              </Carousel>
              <div className="btn-groups">
                <button type="button" className="add-cart-btn"><i className="fas fa-shopping-cart"></i> add to
                  cart</button>
                <button type="button" className="buy-now-btn"><i className="fas fa-wallet"></i> buy now</button>
              </div>
            </div>
            <div className="col-md-6 col-12 my-2">
              <div className="product-div-right">
                <span className="product-name">Black Light Hair Oil For Men {id}</span>
                <p className="product-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda expedita
                  quos aperiam quaerat nesciunt adipisci eius iste earum non reprehenderit?</p>
                <p className="s-price">Special price</p>
                <div className="special-price">
                  <span className="product-price">$50.25</span>
                  <strike>$80.25</strike>
                  <h5 className="discount">30% OFF</h5>
                </div>
                <div className="pub-stars">
                  <h4>3.5 <FaStar className="star-icon" /></h4>
                  <a href="#reviewRating">952 Ratings, 198 Reviews •</a>
                </div>
                <p className="s-price">Product Details</p>
                <div className="product-det">
                  <p>Name: <span>Black light hair oil for men</span></p>
                  <p>Material: <span>CU</span></p>
                  <p>No. of Compartments: <span>22</span></p>
                  <p>Multipack: <span>3</span></p>
                  <p>Sizes: <span>Free Size (Length Size : 10 in, Width Size: 10 in)</span></p>
                  <p>Country of Origin: <span>India</span></p>
                  <p>Colour: <span>Yellow light</span></p>
                </div>
                <div className="review-rating" id="reviewRating">
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
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* -- Similar Products --  */}
      <div class="container-fluid pt-5 ps-3"><h2 class="section-heading">Similar Products</h2></div>
      <ProductCarouselSec loading={loading} products={products} />

      {/* -- People also viewed --  */}
      <div class="container-fluid pt-5 ps-3"><h2 class="section-heading">People also viewed</h2></div>
      <ProductCarouselSec loading={loading} products={products} />
    </>
  )
}

export default ProductDetails