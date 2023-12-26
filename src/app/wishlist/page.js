import "@/app/styles/style.css"
import { FaStar, FaTrashAlt } from "react-icons/fa";
import img1 from '../../../public/assets/images/product1.png'
import img2 from '../../../public/assets/images/product2.png'
import img3 from '../../../public/assets/images/product3.png'
import Image from "next/image";

const data = [
  {
    id: 1,
    img: img1,
    name: "Hair Black Light Oil",
    price: '$120.00'
  },
  {
    id: 2,
    img: img2,
    name: "Men Face Crim White",
    price: '$200.00'
  },
  {
    id: 3,
    img: img3,
    name: "Body Light Oil",
    price: '$300.00'
  },
]

const Wishlist = () => {
  return (
    <div className="wishlist-sec">
      <div className="container">
        <h2 className="section-heading">My Wishlist (3)</h2>
        {
          data.map((item) => (
            <div className="cart-table-details my-3">
              <div className="row">
                <div className="col-10 d-flex align-items-center">
                  <div className="wish-img">
                    <Image src={item?.img} alt={item?.name} />
                  </div>
                  <div className="product-details">
                    <div className="product-title">{item?.name}</div>
                    <ul className="stars">
                      <li><FaStar className="star-icon" /></li>
                      <li><FaStar className="star-icon" /></li>
                      <li><FaStar className="star-icon" /></li>
                      <li><FaStar className="star-icon" /></li>
                      <li><FaStar className="star-icon" /></li>
                    </ul>
                    <p className="product-price">{item?.price}</p>
                  </div>
                </div>
                <div className="col-2 remove-wish">
                  <button className="remove-product">
                    <FaTrashAlt className="trash-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Wishlist