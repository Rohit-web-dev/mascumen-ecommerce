"use client"
import { useState } from 'react';
import "@/app/styles/style.css"
import Banner from '@/components/common/Banner'
import img from '../../../public/assets/images/about-us-page-heading.jpg'

const Checkout = () => {

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="mb-4">
              <h2 className="section-heading">Billing Address</h2>
              <div className="row">
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">First Name</label>
                  <input className="form-control" type="text" placeholder="John" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">Last Name</label>
                  <input className="form-control" type="text" placeholder="Doe" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">E-mail</label>
                  <input className="form-control" type="text" placeholder="example@email.com" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">Mobile No</label>
                  <input className="form-control" type="text" placeholder="+123 456 789" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">Address Line 1</label>
                  <input className="form-control" type="text" placeholder="123 Street" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">Address Line 2</label>
                  <input className="form-control" type="text" placeholder="123 Street" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">Country</label>
                  <select className="custom-select form-control">
                    <option selected>United States</option>
                    <option>Afghanistan</option>
                    <option>Albania</option>
                    <option>Algeria</option>
                  </select>
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">City</label>
                  <input className="form-control" type="text" placeholder="New York" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">State</label>
                  <input className="form-control" type="text" placeholder="New York" />
                </div>
                <div className="col-md-6 form-group my-2">
                  <label className="mb-1">ZIP Code</label>
                  <input className="form-control" type="text" placeholder="123" />
                </div>
                <div className="col-md-12 form-group mt-3">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input me-2" id="newaccount" />
                    <label className="custom-control-label" for="newaccount">Create an account</label>
                  </div>
                </div>
                <div className="col-md-12 form-group my-2">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input me-2" id='shipto' checked={isChecked} onChange={handleCheckboxChange} />
                    <label className="custom-control-label" for="shipto" data-toggle="collapse"
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
                    <label className="mb-1">First Name</label>
                    <input className="form-control" type="text" placeholder="John" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">Last Name</label>
                    <input className="form-control" type="text" placeholder="Doe" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">E-mail</label>
                    <input className="form-control" type="text" placeholder="example@email.com" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">Mobile No</label>
                    <input className="form-control" type="text" placeholder="+123 456 789" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">Address Line 1</label>
                    <input className="form-control" type="text" placeholder="123 Street" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">Address Line 2</label>
                    <input className="form-control" type="text" placeholder="123 Street" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">Country</label>
                    <select className="custom-select form-control">
                      <option selected>United States</option>
                      <option>Afghanistan</option>
                      <option>Albania</option>
                      <option>Algeria</option>
                    </select>
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">City</label>
                    <input className="form-control" type="text" placeholder="New York" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">State</label>
                    <input className="form-control" type="text" placeholder="New York" />
                  </div>
                  <div className="col-md-6 form-group my-2">
                    <label className="mb-1">ZIP Code</label>
                    <input className="form-control" type="text" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-4">
            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0 text-white">Order Total</h4>
              </div>
              <div className="card-body">
                <h5 className="font-weight-medium mb-3">Products</h5>
                <div className="d-flex justify-content-between">
                  <p>Black Saree</p>
                  <p>$150</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Spring Collection</p>
                  <p>$150</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Classic Dress</p>
                  <p>$150</p>
                </div>
                <hr className="mt-0" />
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">$150</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">$160</h5>
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
                    <input type="radio" className="custom-control-input me-2" name="payment" id="paypal" />
                    <label className="custom-control-label" for="paypal">Paypal</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-radio my-2">
                    <input type="radio" className="custom-control-input me-2" name="payment" id="directcheck" />
                    <label className="custom-control-label" for="directcheck">Direct Check</label>
                  </div>
                </div>
                <div className="">
                  <div className="custom-control custom-radio my-2">
                    <input type="radio" className="custom-control-input me-2" name="payment" id="banktransfer" />
                    <label className="custom-control-label" for="banktransfer">Bank Transfer</label>
                  </div>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <button className="checkout-btn">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout