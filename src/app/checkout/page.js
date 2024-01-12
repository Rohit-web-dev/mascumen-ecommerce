"use client"
import { useState, useEffect, useContext } from 'react';
import "@/app/styles/style.css"
import Banner from '@/components/common/Banner'
import img from '../../../public/assets/images/about-us-page-heading.jpg'
import { getCartData, addOrderAllDetails } from '@/appwrite/config';
import CommonToast from '@/components/common/CommonToast';
import Loader from '../loading';
import { useForm } from 'react-hook-form';
import userContext from '@/context/user/userContext';

const Checkout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const taxRate = 0.05;
  const shippingRate = 15.0;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const currentUserID = useContext(userContext)
  const roleID = currentUserID?.currentUserRollID

  useEffect(() => {
    setLoading(true);
    getCartData()
      .then((data) => {
        setCartItems(data?.filter(item => item.userId === roleID));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    recalculateCart();
  }, [cartItems]);


  const recalculateCart = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += (item.ecommerceWebProducts[0]?.price || 0) * (item?.productItem || 0);
      setSubTotal(subtotal);
    });
    const tax = subTotal * taxRate;
    const shipping = subtotal > 0 ? shippingRate : 0;
    const total = subTotal + tax + shipping;
    setCartTotal(total);
  };

  const totalAmount = (subTotal + taxRate * subTotal + shippingRate).toFixed(2)

  const [checkoutDetails, setCheckoutDetails] = useState({
    addressOne: '',
    addressTwo: '',
    city: '',
    country: '',
    state: '',
    pin: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCheckoutDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      CommonToast("error", "Can't submit form. Cart is empty");
      return;
    }

    const dataToSend = cartItems.map((item) => {
      return {
        productId: item?.$id,
        productItem: item?.productItem,
      };
    });

    if (selectedValue !== 'COD') {
      CommonToast("error", "Only Select Cash on Delivery");
      return;
    }

    try {
      await addOrderAllDetails(roleID, data, selectedValue, totalAmount, dataToSend);
      CommonToast("success", "Successfully added order details");
    } catch (error) {
      console.error('Error adding order details:', error);
    }
  };


  return (
    <>
      {/* -- banner --  */}
      <Banner
        Img={img}
        Title={"Check Our Products"}
        Para={"Style is way to say who you are without having to speak"}
      />

      <div className="container-fluid pt-5">
        {loading && <Loader />}
        {!loading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row px-xl-5">
              <div className="col-lg-8">
                <div className="mb-4">
                  <h2 className="section-heading">Billing Address</h2>
                  <div className="row">
                    <div className="col-md-6 form-group my-2">
                      <label className="mb-1" htmlFor='addressOne'>Address Line 1</label>
                      <input
                        id='addressOne'
                        className={`form-control ${errors.addressOne ? 'is-invalid' : ''}`}
                        type="text"
                        {...register('addressOne', {
                          required: 'This field is required',
                          minLength: { value: 6, message: 'Minimum length is 6 characters' },
                        })}
                        placeholder="123 Street"
                      />
                      {errors.addressOne && (
                        <div className="invalid-feedback">{errors.addressOne.message}</div>
                      )}
                    </div>
                    <div className="col-md-6 form-group my-2">
                      <label className="mb-1" htmlFor='addressTwo'>Address Line 2</label>
                      <input
                        id='addressTwo'
                        className={`form-control ${errors.addressTwo ? 'is-invalid' : ''}`}
                        type="text"
                        {...register('addressTwo', { required: false })}
                        placeholder="123 Street"
                      />
                      {errors.addressTwo && <div className="invalid-feedback">{errors.addressTwo.message}</div>}
                    </div>
                    <div className="col-md-6 form-group my-2">
                      <label className="mb-1" htmlFor='country'>Country</label>
                      <select
                        id='country'
                        className={`custom-select form-control ${errors.country ? 'is-invalid' : ''}`}
                        {...register('country', { required: 'This field is required' })}
                      >
                        <option value="" disabled selected>Select Country</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="India">India</option>
                      </select>
                      {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                    </div>
                    <div className="col-md-6 form-group my-2">
                      <label className="mb-1" htmlFor='state'>State</label>
                      <input
                        id='state'
                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                        type="text"
                        {...register('state', { required: 'This field is required' })}
                        placeholder="New York"
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                    </div>
                    <div className="col-md-6 form-group my-2">
                      <label className="mb-1" htmlFor='city'>City</label>
                      <input
                        id='city'
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        type="text"
                        {...register('city', { required: 'This field is required' })}
                        placeholder="New York"
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                    </div>
                    <div className="col-md-6 form-group my-2">
                      <label className="mb-1" htmlFor='pin'>ZIP Code</label>
                      <input
                        id='pin'
                        className={`form-control ${errors.pin ? 'is-invalid' : ''}`}
                        type="text"
                        {...register('pin', { required: 'This field is required' })}
                        placeholder="123"
                      />
                      {errors.pin && <div className="invalid-feedback">{errors.pin.message}</div>}
                    </div>
                    <div className="col-md-12 form-group mt-3">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input me-2" id="newaccount" />
                        <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
                      </div>
                    </div>
                    <div className="col-md-12 form-group my-2">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input me-2" id='shipto' checked={isChecked} onChange={handleCheckboxChange} />
                        <label className="custom-control-label" htmlFor="shipto" data-toggle="collapse"
                          data-target="#shipping-address">Ship to different address</label>
                      </div>
                    </div>
                  </div>
                </div>
                {isChecked && (
                  <div className="mb-4" id="shipping-address">
                    <h2 className="section-heading">Shipping Address</h2>
                    <div className="row">
                      <div className="col-md-6 form-group my-2">
                        <label className="mb-1" htmlFor='dAddressOne'>Address Line 1</label>
                        <input className="form-control" id='dAddressOne' type="text" name="dAddressOne" value={checkoutDetails.dAddressOne} onChange={handleChange} placeholder="123 Street" />
                      </div>
                      <div className="col-md-6 form-group my-2">
                        <label className="mb-1" htmlFor='dAddressTwo'>Address Line 2</label>
                        <input className="form-control" id='dAddressTwo' type="text" name="dAddressTwo" value={checkoutDetails.dAddressTwo} onChange={handleChange} placeholder="123 Street" />
                      </div>
                      <div className="col-md-6 form-group my-2">
                        <label className="mb-1" htmlFor='dCountry'>Country</label>
                        <select className="custom-select form-control" id='dCountry' name="dCountry" value={checkoutDetails.dCountry} onChange={handleChange}>
                          <option value="" selected>United States</option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="India">India</option>
                        </select>
                      </div>
                      <div className="col-md-6 form-group my-2">
                        <label className="mb-1" htmlFor='dCity'>City</label>
                        <input className="form-control" id='dCity' type="text" name="dCity" value={checkoutDetails.dCity} onChange={handleChange} placeholder="New York" />
                      </div>
                      <div className="col-md-6 form-group my-2">
                        <label className="mb-1" htmlFor='dState'>State</label>
                        <input className="form-control" id='dState' type="text" name="dState" value={checkoutDetails.dState} onChange={handleChange} placeholder="New York" />
                      </div>
                      <div className="col-md-6 form-group my-2">
                        <label className="mb-1" htmlFor='dPin'>ZIP Code</label>
                        <input className="form-control" id='dPin' type="text" name="dPin" value={checkoutDetails.dPin} onChange={handleChange} placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-4">
                <div className="card border-secondary mb-5">
                  <div className="card-header bg-secondary border-0">
                    <h4 className="font-weight-semi-bold m-0 text-white">Price Details</h4>
                  </div>
                  <div className="card-body">
                    {
                      cartItems?.map((item) => (
                        <div className="d-flex justify-content-between mb-2" key={item?.$id}>
                          <p>{item?.ecommerceWebProducts[0]?.title} ({item?.productItem} items)</p>
                          <p>₹{(item?.ecommerceWebProducts[0]?.price * item?.productItem).toFixed(2)}</p>
                        </div>
                      ))
                    }
                    <hr className="mt-0" />
                    <div className="d-flex justify-content-between mb-2 pt-1">
                      <h6 className="font-weight-medium">Subtotal</h6>
                      <h6 className="font-weight-medium">₹{subTotal.toFixed(2)}</h6>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="font-weight-medium">Tax (5%)</h6>
                      <h6 className="font-weight-medium">₹{(taxRate * subTotal).toFixed(2)}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h6 className="font-weight-medium">Shipping</h6>
                      <h6 className="font-weight-medium">₹{(shippingRate).toFixed(2)}</h6>
                    </div>
                  </div>
                  <div className="card-footer border-secondary bg-transparent">
                    <div className="d-flex justify-content-between mt-2">
                      <h5 className="font-weight-bold">Total</h5>
                      <h5 className="font-weight-bold">₹{totalAmount}</h5>
                    </div>
                  </div>
                </div>
                <div className="card border-secondary mb-5">
                  <div className="card-header bg-secondary border-0">
                    <h4 className="font-weight-semi-bold m-0 text-white">Payment</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <div className="custom-control custom-radio my-2">
                        <input type="radio" className="custom-control-input me-2" value="UPI" checked={selectedValue === 'UPI'} onChange={handleRadioChange} id="upi" />
                        <label className="custom-control-label" htmlFor="upi">UPI</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-radio my-2">
                        <input type="radio" className="custom-control-input me-2" value="Wallets" checked={selectedValue === 'Wallets'} onChange={handleRadioChange} id="wallets" />
                        <label className="custom-control-label" htmlFor="wallets">Wallets</label>
                      </div>
                    </div>
                    <div className="">
                      <div className="custom-control custom-radio my-2">
                        <input type="radio" className="custom-control-input me-2" value="Card" checked={selectedValue === 'Card'} onChange={handleRadioChange} id="card" />
                        <label className="custom-control-label" htmlFor="card">Credit / Debit / ATM Card</label>
                      </div>
                    </div>
                    <div className="">
                      <div className="custom-control custom-radio my-2">
                        <input type="radio" className="custom-control-input me-2" value="Net Banking" checked={selectedValue === 'Net Banking'} onChange={handleRadioChange} id="netBanking" />
                        <label className="custom-control-label" htmlFor="netBanking">Net Banking</label>
                      </div>
                    </div>
                    <div className="">
                      <div className="custom-control custom-radio my-2">
                        <input type="radio" className="custom-control-input me-2" value="COD" checked={selectedValue === 'COD'} onChange={handleRadioChange} id="cod" />
                        <label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer border-secondary bg-transparent">
                    <button type="submit" className="checkout-btn">Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default Checkout